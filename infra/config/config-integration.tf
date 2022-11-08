provider "aws" {
  alias = "integration"
  region = var.region
}
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket  = "dcmaw-gds-integration-tfstate"
    encrypt = true
    key     = "fe-integration-terraform.tfstate"
    region  = "eu-west-2"
    dynamodb_table = "terraform-state-lock-dynamo"
  }
}