provider "aws" {
  alias = "build"
  region = var.region
}
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket  = "dcmaw-gds-build-tfstate"
    encrypt = true
    key     = "fe-build-terraform.tfstate"
    region  = "eu-west-2"
    dynamodb_table = "terraform-state-lock-dynamo"
  }
}