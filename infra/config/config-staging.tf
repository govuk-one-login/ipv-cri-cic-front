provider "aws" {
  alias = "staging"
  region = var.region
}
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket  = "dcmaw-gds-staging-tfstate"
    encrypt = true
    key     = "fe-staging-terraform.tfstate"
    region  = "eu-west-2"
    dynamodb_table = "terraform-state-lock-dynamo"
  }
}