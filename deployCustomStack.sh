#!/bin/bash

# Environment variables
REGION="eu-west-2"
AWS_ACCOUNT_ID="060113405249"
CUSTOM_IMAGE_NAME="viveak-script"
STACK_NAME="viveak-script"
IMAGE_TAG="latest"
DOCKERFILE_PATH="./Dockerfile"
TEMPLATE_PATH="./template.yaml"
ECR_LOGIN_URL="${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com"
IMAGE_URI="${ECR_LOGIN_URL}/${CUSTOM_IMAGE_NAME}:${IMAGE_TAG}"
API_BASE_URL="https://api-cic-cri-api.review-c.dev.account.gov.uk"
IPV_STUB_URL="https://erveje5km8.execute-api.eu-west-2.amazonaws.com/dev/start"

# Function to restore original Dockerfile and Template.yaml
cleanup() {
  mv -f "${DOCKERFILE_PATH}.bak" "$DOCKERFILE_PATH" 2>/dev/null
  mv -f "${TEMPLATE_PATH}.bak" "$TEMPLATE_PATH" 2>/dev/null
}

trap cleanup EXIT INT TERM

# Backup and prepare files
cp "$DOCKERFILE_PATH" "${DOCKERFILE_PATH}.bak"
cp "$TEMPLATE_PATH" "${TEMPLATE_PATH}.bak"

# ECR login
aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$ECR_LOGIN_URL"

# Use sed to comment out specific lines for macOS in Dockerfile
echo "Updating Dockerfile for macOS compatibility..."
sed -i '' '/COPY --from=khw46367.live.dynatrace.com\/linux\/oneagent-codemodules-musl:nodejs \/ \// s/^/#/' "$DOCKERFILE_PATH"
sed -i '' '/ENV LD_PRELOAD \/opt\/dynatrace\/oneagent\/agent\/lib64\/liboneagentproc.so/ s/^/#/' "$DOCKERFILE_PATH"

echo "The Dockerfile has been updated."

# Build and push Docker image
docker build -t "$IMAGE_URI" .
docker push "$IMAGE_URI"

# Update Template.yaml with new image URI
sed -i '' "s|Image: CONTAINER-IMAGE-PLACEHOLDER|Image: $IMAGE_URI|" "$TEMPLATE_PATH"

# Deploy with AWS SAM
sam build --parallel --no-cached
sam deploy --resolve-s3 --stack-name "$STACK_NAME" --region "$REGION" --capabilities CAPABILITY_IAM --parameter-overrides Environment="dev" PermissionsBoundary="none" VpcStackName="vpc-cri" EnableScalingInDev=0

# Fetch stack outputs
aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region "$REGION" --query 'Stacks[0].Outputs' --output table

# Environment variables for testing (assuming they are used in the testing scripts)
export API_BASE_URL=$API_BASE_URL
export IPV_STUB_URL=$IPV_STUB_URL

# Run browser tests
yarn test:browser:ci

# Ask if the user still needs the stack
read -p "Do you still need this stack? (Y/N): " answer
if [[ $answer =~ ^[Nn]$ ]]
then
    echo "Deleting stack..."
    aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$REGION"
    echo "Stack deletion initiated. It may take a few minutes to complete."
fi
