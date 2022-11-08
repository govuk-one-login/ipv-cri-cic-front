# data "aws_vpc" "vpc" {
#    filter {
#      name = "tag-value"
#      values = ["${var.vpc_name}-vpc-${var.environment}"]
#    }
# }

# data "aws_subnet" "public_Subnet" {
#   vpc_id = "${data.aws_vpc.vpc.id}"
#   filter {
#     name = "tag:Name"
#     values = ["${var.vpc_name}-public-subnet-${var.environment}-${format("%03d", count.index+1)}"]
#   }
# }

data "aws_ssm_parameter" "access_logs_bucket" {
  name = "/${var.environment}/Platform/AccessLogs/bucket"
}

resource "aws_lb" "main" {
  name               = "${var.name}-alb-${var.environment}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = var.alb_security_groups
  subnets            = var.subnets
  enable_deletion_protection = false

  access_logs {
    bucket = data.aws_ssm_parameter.access_logs_bucket.value
    prefix = "${var.environment}-alb-logs"
    enabled = true
  }

  tags = {
    Name        = "${var.name}-alb-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_alb_target_group" "main" {
  name        = "${var.name}-tg-${var.environment}"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = "${var.vpc_id}"
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }

  tags = {
    Name        = "${var.name}-tg-${var.environment}"
    Environment = var.environment
  }
}

# Redirect to https listener
resource "aws_alb_listener" "http" {
  load_balancer_arn = aws_lb.main.id
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# Redirect traffic to target group
resource "aws_alb_listener" "https" {
    load_balancer_arn = aws_lb.main.id
    port              = 443
    protocol          = "HTTPS"

    ssl_policy        = "ELBSecurityPolicy-2016-08"
    certificate_arn   = aws_acm_certificate.cert.arn

    default_action {
        target_group_arn = aws_alb_target_group.main.id
        type             = "forward"
    }
}

locals {
  subdomain = var.domain
}

resource "aws_acm_certificate" "cert" {
  domain_name       = local.subdomain
  validation_method = "DNS"
  subject_alternative_names = ["*.${local.subdomain}"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = "Z09673822K73RLU1GSE5G"
}

resource "aws_route53_record" "alb_to_r53" {
  name    = "www.${local.subdomain}"
  type    = "CNAME"
  zone_id = "Z09673822K73RLU1GSE5G"
  records = [aws_lb.main.dns_name]
  ttl     = "300"
}

resource "aws_route53_record" "app_to_r53" {
  name    = "app.${local.subdomain}"
  type    = "CNAME"
  zone_id = "Z09673822K73RLU1GSE5G"
  records = [aws_lb.main.dns_name]
  ttl     = "300"
}

resource "aws_acm_certificate_validation" "acm_cert_validate" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

output "endpoint" {
  value = "https://${local.subdomain}"
}

output "certificate_arn" {
    value = aws_acm_certificate.cert.arn
}
output "aws_alb_target_group_arn" {
  value = aws_alb_target_group.main.arn
}

resource "aws_ssm_parameter" "wildcard_certificate_arn" {
  name = "/${var.environment}/Platform/ACM/PrimaryZoneWildcardCertificateARN"
  description = "The primary zone wildcard certificate ARN."
  type = "String"
  value = aws_acm_certificate.cert.arn
}

resource "aws_wafv2_web_acl_association" "waf_acl" {
  resource_arn = aws_lb.main.arn
  web_acl_arn   = data.aws_ssm_parameter.regional_waf.value
}

data "aws_ssm_parameter" "regional_waf" {
  name = "/dev/Platform/Security/WafArn"
}