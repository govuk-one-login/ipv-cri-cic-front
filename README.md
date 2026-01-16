# di-ipv-cri-cic-front

Frontend for the Claimed Identity Collector (CIC) journey within GOV.UK One Login IPV.

> Public repository: do not commit secrets, credentials, internal URLs, account identifiers, template IDs, or sensitive configuration values. Use placeholders in examples.

---

## Table of contents---

## Table of contents
- [Quick links](#quick-links)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Run front-end locally against deployed back-end](#run-front-end-locally-against-deployed-back-end)
- [Deployment in your own stack](#deployment-in-your-own-stack)
- [Request properties](#request-properties)
- [Browser tests](#browser-tests)
- [Code Owners](#code-owners)
- [Create and upload a custom image to ECR](#create-and-upload-a-custom-image-to-ecr)
- [Dependency Installation](#dependency-installation)
- [Post Installation Configuration](#post-installation-configuration)
- [Licence](#licence)

---

## Quick links
- **Environment sample:** `.env.sample`
- **App source:** `src/`
- **Infra template:** `template.yaml`
- **IPV stub:** documented via `IPV_STUB_URL` in `.env.sample` (use placeholders; do not add real URLs)
- **Axios middleware:** `src/lib/axios/`
- **Code owners:** `CODEOWNERS` (if present)

- [Quick links](#quick-links)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Run front-end locally against deployed back-end](#run-front-end-locally-against-deployed-back-end)
- [Deployment in your own stack](#deployment-in-your-own-stack)
- [Request properties](#request-properties)
- [Browser tests](#browser-tests)
- [Code Owners](#code-owners)
- [Create and upload a custom image to ECR](#create-and-upload-a-custom-image-to-ecr)
- [Dependency Installation](#dependency-installation)
- [Post Installation Configuration](#post-installation-configuration)
- [Licence](#licence)

---

## Quick links
- **Environment sample:** `.env.sample`
- **App source:** `src/`
- **Infra template:** `template.yaml`
- **IPV stub:** documented via `IPV_STUB_URL` in `.env.sample` (use placeholders; do not add real URLs)
- **Axios middleware:** `src/lib/axios/`
- **Code owners:** `CODEOWNERS` (if present)

---

## Installation

Clone this repository and then run:

```bash
yarn install --frozen-lockfile
yarn build
```

## Environment Variables

All required environment variables are inside the `.env.sample` file. Copy its contents to a `.env` file in the same location. Do not commit `.env`, and do not add real values to this README.

- `CUSTOM_FE_URL` only needs to be populated if you would like to test against a custom deployed FE stack or if you wish to run browser tests against your local stack (default port `5020`).
- `API_BASE_URL` - URL to the ipv-cri-cic-api CRI back-end.
- `IPV_STUB_URL` - URL of the IPV stub used to start journeys (test-only).
- `PORT` - Default port to run webserver on (defaults to `5020`).
- `SESSION_SECRET` - Secret used when configuring the HMPO session.
- `GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID` - Container ID for GA4 tracking.
- `UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID` - Container ID for UA tracking.
- `GA4_ENABLED` - Feature flag to enable GA4, defaulted to `"true"`.
- `UA_ENABLED` - Feature flag to enable UA, defaulted to `"false"`.
- `ANALYTICS_DATA_SENSITIVE` - Redacts all form response data, defaulted to `"true"`. Only set to `"false"` if a journey section contains no PII in non-text-based form controls.
- `GA4_PAGE_VIEW_ENABLED` - Feature flag to enable GA4 page view tracking, defaulted to `"true"`.
- `GA4_FORM_RESPONSE_ENABLED` - Feature flag to enable GA4 form response tracking, defaulted to `"true"`.
- `GA4_FORM_ERROR_ENABLED` - Feature flag to enable GA4 form error tracking, defaulted to `"true"`.
- `GA4_FORM_CHANGE_ENABLED` - Feature flag to enable GA4 form change tracking, defaulted to `"true"`.
- `GA4_NAVIGATION_ENABLED` - Feature flag to enable GA4 navigation tracking, defaulted to `"true"`.
- `GA4_SELECT_CONTENT_ENABLED` - Feature flag to enable GA4 select content tracking, defaulted to `"true"`.
- `LANGUAGE_TOGGLE_DISABLED` - Feature flag to disable Language Toggle, defaulted to `true`.

## Run front-end locally against deployed back-end

- Set up `.env` as described above.
- Run `yarn build` followed by `yarn start`.
- Make a `POST` call to the `IPV_STUB_URL` (from .env) with the following body payload:

```json
{
  "frontendURL": "http://localhost:5020"
}
```

- Start the journey by navigating to the `AuthorizeLocation` in the stub response.

## Deployment in your own stack

This is an exceptional workflow; default deployments are via the pipeline/team process.

To deploy a copy of the frontend infrastructure from a local branch as a separate isolated stack:

- Update the `Image:` tag in `template.yaml` to point to the container image to be deployed.
- Then run:

```shell
sam build --parallel --no-cached
sam deploy --resolve-s3 --stack-name "<stack-name>" --capabilities CAPABILITY_IAM --confirm-changeset --parameter-overrides \
"Environment=\"<environment>\" PermissionsBoundary=\"<permissions-boundary>\" VpcStackName=\"<vpc-stack-name>\" EnableScalingInDev=0"
```

The following parameters can be used to specify whether or not to deploy the autoscaling infrastructure:

- `EnableScalingInDev` defaults to 0 which inhibits deployment of scaling infrastructure; set to 1 to deploy scaling infrastructure.
- `MinContainerCount` default is 3.
- `MaxContainerCount` default is 12.

## Request properties

A shared [axios](https://axios-http.com/) middleware is used for API calls; see [src/lib/axios](./src/lib/axios).

## Browser tests

Browser based tests can be run against a deployed API stack using an IPV stub. To run the tests make sure your `.env` points at the relevant environment. Do not add environment URLs to this README and do not commit `.env` values. Then run `npm run test:browser`.

Adding `CUSTOM_FE_URL=<http://localhost:5020>` will run browser tests against your local changes.

These tests are written using [Cucumber](https://cucumber.io/docs/installation/javascript/) as the test runner and [Playwright](https://playwright.dev/) as the automation tool. They also follow the [Page Object Model](https://playwright.dev/docs/test-pom) for separation of concerns.

### Code Owners

This repo has a `CODEOWNERS` file in the root and is configured to require PRs to be reviewed by Code Owners.

## Create and upload a custom image to ECR

Execute the following commands to create a custom image locally and push it up to ECR.
You need to have AWS credentials in your shell via `aws-vault` or `gds-cli` or similar.
`<ecr-repo>` needs to refer to an existing repo in ECR, you can create one in the AWS console if you do not have one already.

```shell
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com
docker build --platform linux/amd64 -t di-ipv-cri-cic-front:<image-tag> .
docker tag di-ipv-cri-cic-front:<image-tag> <aws-account-id>.dkr.ecr.<region>.amazonaws.com/<ecr-repo>:<image-tag>
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/<ecr-repo>:<image-tag>
```

Then to use this new image update the `Image:` tag in `template.yaml` and redeploy your template locally into your own stack.

### Dependency Installation

To use this locally you will first need to install the dependencies, this can be done in two ways:

#### Method 1 - Python pip

Run the following in a terminal:

```
sudo -H pip3 install checkov pre-commit cfn-lint
```

This should work across platforms.

#### Method 2 - Brew

If you have brew installed please run the following:

```
brew install pre-commit ;\
brew install cfn-lint ;\
brew install checkov
```

### Post Installation Configuration

Once installed run:

```
pre-commit install
```

To update the various versions of the pre-commit plugins, this can be done by running:

```
pre-commit autoupdate && pre-commit install
```

This will install and configure the pre-commit git hooks. If it detects an issue while committing it will produce an output like the following:

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

## Licence

This repository does not currently publish a LICENSE/LICENCE file.
