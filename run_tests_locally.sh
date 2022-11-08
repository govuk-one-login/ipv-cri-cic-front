#!/bin/bash
set -eu

if [ $# -ge 1 ] && [ -n "$1" ]
then
    echo "Running test container against $1"
    export ECR_BASE_IMAGE="709132032242.dkr.ecr.eu-west-2.amazonaws.com/reference-web-base-image:latest"
    export SAM_STACK=$1
    export AWS_REGION="eu-west-2"
    export TEST_REPORT_DIR="results"
    export ENVIRONMENT="dev"

    mkdir -p results # The directory on the host where the test results will be outputted.

    aws cloudformation describe-stacks --stack-name "$SAM_STACK" --region "$AWS_REGION" --query 'Stacks[0].Outputs[].{key: OutputKey, value: OutputValue}' --output text > cf-output.txt
    eval $(awk '{ printf("export CFN_%s=\"%s\"\n", $1, $2) }' cf-output.txt)
    awk '{ printf("CFN_%s=\"%s\"\n", $1, $2) }' cf-output.txt > docker_vars.env
    echo TEST_REPORT_DIR="$TEST_REPORT_DIR" >> docker_vars.env
    echo TEST_REPORT_ABSOLUTE_DIR=/app/results >> docker_vars.env
    echo TEST_ENVIRONMENT="$ENVIRONMENT" >> docker_vars.env
    echo SAM_STACK_NAME="$SAM_STACK" >> docker_vars.env

#    aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 709132032242.dkr.ecr.eu-west-2.amazonaws.com
    docker build -f Dockerfile.test -t testcontainer .
    docker run --rm --env-file docker_vars.env -v $(pwd)/app/results:/results testcontainer
else
    echo "Please ensure you've got a stack name as the first argument after ./run_test_locally.sh..."
    echo "E.g. ./run_test_locally.sh di-ipv-oauth-back"
fi