# resource "aws_dynamodb_table" "dynamodb-terraform-state-lock" {
#   name           = "terraform-state-lock-dynamo"
#   hash_key       = "LockID"
#   read_capacity  = 20
#   write_capacity = 20
#   attribute {
#     name = "LockID"
#     type = "S"
#   }
#   tags = {
#     Name = "DynamoDB Terraform State Lock Table"
#   }
# }

data "aws_vpc" "vpc" {
  filter {
    name   = "tag:Name"
    values = ["${var.vpc_name}*"]
  }
}

# FIND PUBLIC SUBNETS
data "aws_subnet" "public_subnet" {
  vpc_id = data.aws_vpc.vpc.id
  count  = length(var.public_subnets)
  filter {
    name   = "tag:Name"
    values = ["${var.vpc_name}-public-subnet-${var.environment}-${format("%03d", count.index + 1)}"]
  }
}

# FIND PRIVATE SUBNETS
data "aws_subnet" "private_subnet" {
  vpc_id = data.aws_vpc.vpc.id
  count  = length(var.private_subnets)
  filter {
    name   = "tag:Name"
    values = ["${var.vpc_name}-private-subnet-${var.environment}-${format("%03d", count.index + 1)}"]
  }
}

locals {
  private_subnet_ids = [for k, v in data.aws_subnet.private_subnet : data.aws_subnet.private_subnet[k].id]
  public_subnet_ids  = [for k, v in data.aws_subnet.public_subnet : data.aws_subnet.public_subnet[k].id]
}

data "aws_security_groups" "security_group_alb" {
  filter {
    name   = "group-name"
    values = ["*sg-alb-${var.environment}"]
  }

  filter {
    name   = "tag:Name"
    values = ["*sg-alb-${var.environment}"]
  }
}

data "aws_security_groups" "security_group_ecs_task" {
  filter {
    name   = "group-name"
    values = ["*sg-task-${var.environment}"]
  }

  filter {
    name   = "tag:Name"
    values = ["*sg-task-${var.environment}"]
  }
}

module "alb" {
  source = "./alb"
  #count  = length(var.public_subnets)
  name = var.name
  #vpc_id              = data.aws_vpc.vpc.id
  #subnets             = data.aws_subnet.public_subnet[count.index].id
  vpc_id      = data.aws_vpc.vpc.id
  subnets     = local.public_subnet_ids
  environment = var.environment
  #alb_security_groups = data.aws_security_groups.security_group_alb
  alb_security_groups = data.aws_security_groups.security_group_alb.ids
  health_check_path   = var.health_check_path
}

module "ecr" {
  source            = "./ecr"
  frontend_app_name = var.name
  environment       = var.environment
}

module "ecs" {
  source = "./ecs"
  #count  = length(var.private_subnets)
  name = var.name
  environment  = var.environment
  region       = var.region
  subnets      = local.private_subnet_ids
  #subnets                     = var.private_subnets
  aws_alb_target_group_arn = module.alb.aws_alb_target_group_arn
  #ecs_service_security_groups = data.aws_security_groups.security_group_ecs_task
  ecs_service_security_groups = data.aws_security_groups.security_group_ecs_task.ids
  container_port              = var.container_port
  container_cpu               = var.container_cpu
  container_memory            = var.container_memory
  service_desired_count       = var.service_desired_count
  container_environment = [
    { name = "LOG_LEVEL",
    value = "DEBUG" },
    { name = "PORT",
    value = var.container_port }
  ]
}


output "vpc_id" {
  value = data.aws_vpc.vpc.id
}

output "vpc_private_subnets_list" {
  value = local.private_subnet_ids
}

output "vpc_public_subnets_list" {
  value = local.public_subnet_ids
}
output "security_group_alb_id" {
  value = data.aws_security_groups.security_group_alb.ids
}
output "security_group_ecs_task_id" {
  value = data.aws_security_groups.security_group_ecs_task.ids
}
