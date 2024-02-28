# Digital Identity Claimed Identity Collector

# di-ipv-cri-cic-front

Frontend for the Claimed Identity Collector

This is the home for the front end user interface for a credential issuer as a part of the Identity Proofing and Verification (IPV) system within the GDS digital identity platform. Other repositories are used for core services or other credential issuers.

# Installation

Clone this repository and then run

```bash
yarn install
```

## Environment Variables

All the required Environment Variables can be found in the `.env.sample` file. 
Create a `.env` file in the same location assinging values to all the fields before starting your local FE server

## Run front-end locally against deployed back-end

- Setup `.env` file as mentioned above
- Run `yarn build` followed by `yarn start`
- Make a `POST` call to the IPV_STUB_URL with the following body payload 
```
{
"frontendURL": "http://localhost:5020"
}
```
- Start the journey from the but navigating to the `AuthorizeLocation` in the Stub response


# Deployment in own stack in DEV

To deploy a copy of the frontend infra from a local branch as a separate isolated stack in DEV:

- update the `Image:` tag in template.yaml to point to the container image to be deployed - this can be found by looking in ECR in the AWS Console for the latest image and tag.
- the run:

```shell
sam build --parallel --no-cached
sam deploy --resolve-s3 --stack-name "CUSTOM_STACK_NAME" --capabilities CAPABILITY_IAM --confirm-changeset --parameter-overrides \
"Environment=\"dev\" PermissionsBoundary=\"none\" VpcStackName=\"vpc-cri\" EnableScalingInDev=0"
```

Note the following parameters can be used to specify whether or not to deploy the autoscaling infra:

- `EnableScalingInDev` default to 0 which inhibits deployment of scaling infra in dev; set to 1 to deploy scaling infra
- `MinContainerCount` default is 3
- `MaxContainerCount` default is 12

# Mock Data

[Wiremock](https://wiremock.org/) has been used to create a [stateful mock](https://wiremock.org/docs/stateful-behaviour/) of the API, through the use of scenarios. These configuration files are stored as JSON files in the [./test/mocks/mappings](./test/mocks/mappings) directory.

This can be run by using:

`yarn run mock`

The frontend can be configured to use this mock server through two environment variables:

- `NODE_ENV = development` - this enables a middleware that passes the `x-scenario-id` header from web requests through to the API
- `API_BASE_URL = http://localhost:8090` - this points the frontend at the Wiremock instance

A browser extension, such as [Mod Header](https://modheader.com/), can be used to set the value of this header in a web browser.

# Request properties

In order to support consistent use of headers for API requests, [middleware](./src/lib/axios) is applied to add an instance of
[axios](https://axios-http.com/) on each request onto `req.axios`. This is then reused in any code that uses the API.

# Browser tests

Browser based tests can be run against a deployed API stack using the CIC-IPV Stub. To run the tests make sure you have both the CRI_F2F_API_URL & IPV_STUB_URL params in your.env file and then run `npm run test:browser:ci:local`

This will run browser tets against your local changes

These tests are written using [Cucumber](https://cucumber.io/docs/installation/javascript/) as the test runner and [Playwright](https://playwright.dev/) as the automation tool. They also follow the [Page Object Model](https://playwright.dev/docs/test-pom) for separation of concerns.

They can be run by using:

`yarn run test:browser`

## Using mocked scenario data

Any cucumber feature or scenario with a tag prefixed with `@mock-api:`

e.g.

```
  @mock-api:question-error
  Scenario: API error
...
```

This scenario will be configured to send a `scenario-id` header of `question-error` on every web browser request.

### Code Owners

This repo has a `CODEOWNERS` file in the root and is configured to require PRs to reviewed by Code Owners.

## Create and upload a custom image to ECR

Execute the following commands to create a custom image locally and push it up to ECR.
You need to have AWS credentials in your shell via `aws-vault` or `gds-cli` or similar.
`YOUR_REPO` needs to refer to an existing repo in ECR, you can create one in console if you don't have one already.

```shell
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 060113405249.dkr.ecr.eu-west-2.amazonaws.com
docker build --platform linux/amd64 -t di-ipv-cri-cic-front .
docker tag di-ipv-cri-cic-front:latest 060113405249.dkr.ecr.eu-west-2.amazonaws.com/dev-images-viveakv
docker push 060113405249.dkr.ecr.eu-west-2.amazonaws.com/dev-images-viveakv
```

Then to use this new image update the `Image:` tag in the template.yaml and redeploy your template locally in to your own stack in DEV.

### Dependency Installation

To use this locally you will first need to install the dependencies, this can be done in 2 ways:

#### Method 1 - Python pip

Run the following in a terminal:

```
sudo -H pip3 install checkov pre-commit cfn-lint
```

this should work across platforms

#### Method 2 - Brew

If you have brew installed please run the following:

```
brew install pre-commit ;\
brew install cfn-lint ;\
brew install checkov
```

### Post Installation Configuration

once installed run:

```
pre-commit install
```

To update the various versions of the pre-commit plugins, this can be done by running:

```
pre-commit autoupdate && pre-commit install
```

This will install / configure the pre-commit git hooks, if it detects an issue while committing it will produce an output like the following:

```
 git commit -a
check json...........................................(no files to check)Skipped
fix end of files.........................................................Passed
trim trailing whitespace.................................................Passed
detect aws credentials...................................................Passed
detect private key.......................................................Passed
AWS CloudFormation Linter................................................Failed
- hook id: cfn-python-lint
- exit code: 4
W3011 Both UpdateReplacePolicy and DeletionPolicy are needed to protect Resources/PublicHostedZone from deletion
core/deploy/dns-zones/template.yaml:20:3
Checkov..............................................(no files to check)Skipped
- hook id: checkov
```