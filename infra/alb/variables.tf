variable "name" {
  description = "dcmaw-gds-env-alb"
}

variable "environment" {
  description = "env"
}

variable "subnets" {
  description = "Comma separated list of subnet IDs"
  type = list
}

variable "vpc_id" {
  description = "VPC ID"
}

variable "alb_security_groups" {
  description = "Comma separated list of security groups"
}

variable "health_check_path" {
  description = "Path to check if the service is healthy, e.g. \"/status\""
}

variable "domain" {
  description = "This is the Route53 domain name"
  default = "review-b.build.account.gov.uk"
}