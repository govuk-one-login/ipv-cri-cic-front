variable "name" {
  description = "dcmaw-gds-env"
}

variable "environment" {
  description = "env"
}

variable "region" {
  description = "the AWS region in which resources are created"
  default = "eu-west-2"
}

variable "subnets" {
  description = "List of subnet IDs"
  type = list
}

variable "ecs_service_security_groups" {
  description = "Comma separated list of security groups"
}

variable "container_port" {
  description = "Port of container"
  default = 5000
}

variable "container_cpu" {
  description = "The number of cpu units used by the task"
}

variable "container_memory" {
  description = "The amount (in MiB) of memory used by the task"
}

variable "container_image" {
  description = "Docker image to be launched"
  default = "709132032242.dkr.ecr.eu-west-2.amazonaws.com/di-ipv-dca-front-image"
}

variable "aws_alb_target_group_arn" {
  description = "ARN of the alb target group"
}

variable "service_desired_count" {
  description = "Number of services running in parallel"
}

variable "container_environment" {
  description = "The container environmnent variables"
  type        = list
}
