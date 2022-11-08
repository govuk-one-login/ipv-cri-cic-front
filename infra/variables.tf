variable "name" {
  description = "The Name value is used for resource name such as vpc, security group, elb, etc. (value should be lowercase, alphanumeric with (-) but no other special characters)"
  type        = string
}

variable "environment" {
  description = "The AWS account for this setup"
  type        = string
}

variable "region" {
  description = "the AWS region in which resources are created"
  type        = string
}

variable "availability_zones" {
  description = "a comma-separated list of availability zones, defaults to all AZ of the region, if set to something other than the defaults, both private_subnets and public_subnets have to be defined as well"
  type        = list(any)
}
variable "cidr" {
  description = "The CIDR block for the VPC."
  type        = string
}
variable "private_subnets" {
  description = "a list of CIDRs for private subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  type        = list(any)
}
variable "public_subnets" {
  description = "a list of CIDRs for public subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  type        = list(any)
}
variable "service_desired_count" {
  description = "Number of tasks running in parallel"
  type        = number
}

variable "container_port" {
  description = "The port where the Docker is exposed"
  type        = number
}

variable "container_cpu" {
  description = "The number of cpu units used by the task"
  type        = number
}

variable "container_memory" {
  description = "The amount (in MiB) of memory used by the task"
  type        = number
}

variable "health_check_path" {
  description = "Http path for task health check"
  type        = string
}

variable "vpc_name" {
  description = "VPC name"
  default     = "dcmaw-dev"
}