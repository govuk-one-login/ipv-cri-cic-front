provider "aws" {
  alias = "dev"
  region = var.region
}
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket  = "dcmaw-gds-dev-tfstate"
    encrypt = true
    key     = "fe-dev-terraform.tfstate"
    region  = "eu-west-2"
    dynamodb_table = "terraform-state-lock-dynamo"
  }
}