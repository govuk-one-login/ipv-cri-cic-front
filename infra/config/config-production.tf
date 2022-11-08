provider "aws" {
  alias = "production"
  region = var.region
}
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket  = "dcmaw-gds-production-tfstate"
    encrypt = true
    key     = "fe-production-terraform.tfstate"
    region  = "eu-west-2"
    dynamodb_table = "terraform-state-lock-dynamo"
  }
}