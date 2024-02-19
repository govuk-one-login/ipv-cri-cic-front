#!/bin/bash

# Variables
REPOSITORY_NAME="your-ecr-repository-name"
CUSTOM_IMAGE_NAME="viveak-baqa" # Change this to your custom name or ticket number
STACK_NAME="frontend-baqa" # Change this to your preferred stack name
REGION="eu-west-2" # Change this if you are deploying to a different region
IMAGE_TAG="latest" # You can make this dynamic based on your CI/CD pipeline
AWS_ACCOUNT_ID="060113405249" # Your AWS account ID
DOCKERFILE_PATH="./Dockerfile" # Path to the Dockerfile
TEMPLATE_PATH="./template.yaml" # Path to the Template.yaml

# Function to restore original Dockerfile and Template.yaml
cleanup() {
  echo "Restoring original Dockerfile and Template.yaml..."
  mv -f "${DOCKERFILE_PATH}.bak" "$DOCKERFILE_PATH" 2>/dev/null
  mv -f "${TEMPLATE_PATH}.bak" "$TEMPLATE_PATH" 2>/dev/null
  echo "Cleanup complete."
}

# Set trap to call cleanup function on script exit, interrupt, or termination
trap cleanup EXIT INT TERM

# Start of the script logic
echo "Starting script..."

# Backup the original Dockerfile and Template.yaml
echo "Backing up Dockerfile and Template.yaml..."
cp "$DOCKERFILE_PATH" "${DOCKERFILE_PATH}.bak"
cp "$TEMPLATE_PATH" "${TEMPLATE_PATH}.bak"

# Login to ECR
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 060113405249.dkr.ecr.eu-west-2.amazonaws.com

# Path to the Dockerfile
DOCKERFILE_PATH="./Dockerfile"

# Backup the original Dockerfile
cp "$DOCKERFILE_PATH" "${DOCKERFILE_PATH}.bak"

# Use sed to comment out the specific lines for macOS
sed -i '' '/COPY --from=khw46367.live.dynatrace.com\/linux\/oneagent-codemodules-musl:nodejs \/ \// s/^/#/' "$DOCKERFILE_PATH"
sed -i '' '/ENV LD_PRELOAD \/opt\/dynatrace\/oneagent\/agent\/lib64\/liboneagentproc.so/ s/^/#/' "$DOCKERFILE_PATH"

echo "The Dockerfile has been updated."

# Build and push Docker image
docker build -t cic-cri-front-ecr-containerrepository-ymfhj103wnlw .

docker tag cic-cri-front-ecr-containerrepository-ymfhj103wnlw:latest 060113405249.dkr.ecr.eu-west-2.amazonaws.com/cic-cri-front-ecr-containerrepository-ymfhj103wnlw:viveak-baqa

docker push 060113405249.dkr.ecr.eu-west-2.amazonaws.com/cic-cri-front-ecr-containerrepository-ymfhj103wnlw:viveak-baqa

# Fetch and display the URI of the pushed image
IMAGE_URI="060113405249.dkr.ecr.eu-west-2.amazonaws.com/cic-cri-front-ecr-containerrepository-ymfhj103wnlw:viveak-baqa"
echo "Image URI: $IMAGE_URI"

# Path to the Template.yaml
TEMPLATE_PATH="./template.yaml"

# Backup the original Template.yaml
cp "$TEMPLATE_PATH" "${TEMPLATE_PATH}.bak"

# Use sed to comment out the specific lines for macOS
sed -i '' 's|Image: CONTAINER-IMAGE-PLACEHOLDER|Image: '"$IMAGE_URI"'|' template.yaml

echo "The Template file has been updated."

# sam build --parallel --no-cached
# sam deploy --resolve-s3 --stack-name "$STACK_NAME" --region $REGION --capabilities CAPABILITY_IAM --parameter-overrides \"Environment=\"dev\"" PermissionsBoundary=\"none\" VpcStackName=\"vpc-cri\" EnableScalingInDev=0"
sam build --parallel --no-cached
sam deploy --resolve-s3 --stack-name "$STACK_NAME" --region eu-west-2 --capabilities CAPABILITY_IAM --parameter-overrides \"Environment=\"dev\"" PermissionsBoundary=\"none\" VpcStackName=\"vpc-cri\" EnableScalingInDev=0"

# Fetch the outputs of the CloudFormation stack
echo "Fetching stack outputs..."
aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region $REGION --query 'Stacks[0].Outputs' --output table

# Remind user to check the output URL and visit it with HTTPS
echo "Deployment complete."

export API_BASE_URL=https://api-cic-cri-api.review-c.dev.account.gov.uk

export IPV_STUB_URL=https://erveje5km8.execute-api.eu-west-2.amazonaws.com/dev/start

yarn test:browser:ci

echo "Browser Tests complete."
