# Frontend for Claimed Identity Collector (CIC) CRI service

CIC is a linear journey in one login - which allows individuals, who need to verify their identity to access Government Services online, to manually enter their details and confirm their claimed identity when they are unable to prove it via the App. 

> [!IMPORTANT]
> This repository is **public**. Do **not** commit secrets, credentials, internal URLs, account identifiers, template IDs, or sensitive configuration values. Document **names** and **purposes** only and use placeholders in examples. Localhost examples are permitted.

---

## Table of contents
- [Quick links](#quick-links)
- [What this service does](#what-this-service-does)
- [Getting started](#getting-started)
- [Environment file (.env)](#environment-file-env)
- [Running locally against a deployed back end](#running-locally-against-a-deployed-back-end)
- [Browser tests](#browser-tests)
- [Deployment](#deployment)
  - [Deploying a personal stack (exceptional)](#deploying-a-personal-stack-exceptional)
  - [Custom FE image build and push (optional)](#custom-fe-image-build-and-push-optional)
- [Request properties](#request-properties)
- [Code owners](#code-owners)
- [Pre-commit checks](#pre-commit-checks)
- [Licence](#licence)
- [Quality Gate Tags](#quality-gate-tags)

---

## Quick links
- **Environment sample:** `.env.sample`
- **App source:** `src/`
- **Infra template:** `template.yaml`
- **Axios middleware:** `src/lib/axios/`
- **Code owners:** `CODEOWNERS`

---

## What this service does
This service provides the user interface for the Claimed Identity Collector (CIC) journey. It:
- Integrates with the corresponding backend API (`ipv-cri-cic-api`) using `API_BASE_URL`.
- Supports browser-based end-to-end testing using an IPV stub to start journeys (configured via `IPV_STUB_URL`).

---

## Getting started

### Prerequisites
- Node.js version per `package.json`/tooling used by the repo
- yarn

### Install and build
```sh
yarn install --frozen-lockfile
yarn build
```
---

## Environment file (.env)
`src/.env.example` is the source of truth for required environment variables.  
If a new variable is introduced, update `.env.example` accordingly.

```sh
cd src
cp .env.example .env
```

> [!IMPORTANT]
> Do not commit `.env` or any real secrets to this public repo.

---

## Running locally against a deployed back end
Set up your `.env` based on `.env.example` (ensure `API_BASE_URL` and `IPV_STUB_URL` are set).

Build and start the app:

```sh
yarn build
yarn start
```

Start a journey via the IPV stub:
1) Make a POST call to `IPV_STUB_URL` with the following payload:
```json
{
  "frontendURL": "http://localhost:5020"
}
```
2) Navigate to the `AuthorizeLocation` returned in the stub response.

> [!NOTE]
> `AuthorizeLocation` is returned by the IPV stub service, which is implemented/owned in the API repository (not this frontend repo).

---

## Running tests
All scripts are defined in `package.json`.

### Lint
```sh
yarn lint
```

### Formatting check (Prettier)
```sh
yarn prettier
```

### Unit tests
```sh
yarn test
```

### Test coverage
```sh
yarn test:coverage
```

### Log and PII checks
```sh
yarn test:pii
```

### E2E tests
```sh
yarn test:e2e
```
---

## Browser tests
Browser-based tests can be run against a deployed backend API stack, starting the journey using an IPV stub.

Ensure `.env` points at the environment you are testing against (do not commit values).

Run:

```sh
npm run test:browser
```

To run browser tests against local FE changes, set:

```sh
CUSTOM_FE_URL=http://localhost:5020
```

Tests use:

- Cucumber as the test runner
- Playwright for browser automation
- A Page Object Model approach

### Example Browser Test
```sh
yarn test:browser
```

### Example Browser Test CI-Style
```sh
yarn test:browser:ci
```

---

## Deployment
The standard deployment route is via the CI/CD pipeline for this repository. Use local deployments only when explicitly required.

### Deploying a personal stack (exceptional)
If you must deploy an isolated FE stack (for example for testing an infra change), use a custom stack name (include your initials) to avoid overwriting shared stacks (for example `cic-cri-front-<initials>`).

Example (dev/personal stack):

```sh
sam build --parallel
sam deploy --resolve-s3 --stack-name "di-ipv-cic-cri-front-xy" --capabilities CAPABILITY_IAM --confirm-changeset --parameter-overrides \
"Environment=\"<environment>\" PermissionsBoundary=\"<permissions-boundary>\" VpcStackName=\"<vpc-stack-name>\" EnableScalingInDev=0"
```
> (Use initials + placeholders, no real env values.)

Autoscaling-related parameters (if supported by the template):

- `EnableScalingInDev` – default 0; set 1 to deploy scaling resources.
- `MinContainerCount` – default 3.
- `MaxContainerCount` – default 12.

### Custom FE image build and push (optional)
This section is expressly for debugging and exceptional scenarios where your team supports testing a custom FE image.
Normal frontend deployments should be via the pipeline.

You need AWS credentials in your shell (for example, via aws-vault or equivalent tooling).

```sh
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com
docker build --platform linux/amd64 -t di-ipv-cri-cic-front:<image-tag> .
docker tag di-ipv-cri-cic-front:<image-tag> <aws-account-id>.dkr.ecr.<region>.amazonaws.com/<ecr-repo>:<image-tag>
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/<ecr-repo>:<image-tag>
```

If deploying a custom image, update the `Image:` reference in `template.yaml` and deploy via your team-approved approach.

---

## Request properties
A shared axios middleware is used for API calls; see `src/lib/axios/`. This attaches an axios instance to each request (e.g. `req.axios`) to promote consistent header use and request behaviour.

## Code owners
This repo has a `CODEOWNERS` file in the root and is configured to require PRs to reviewed by Code Owners.

---

## Pre-commit checks
If this repo includes `.pre-commit-config.yaml`, you can enable hooks locally:

```sh
pre-commit install
```

Run hooks manually (optional):

```sh
pre-commit run --all-files
```

> [!NOTE]
> Tool installation methods vary by environment. Use your team’s standard developer setup guidance.

## Licence
If you need reuse/distribution terms, consult the `LICENCE`file's guidance before redistributing.

### Quality Gate Tags

All browser tests should be tagged with `@QualityGateIntegrationTest`. If a test runs in our pipelines (ie in Build), and tests live features, we should tag them with `@QualityGateRegressionTest`.
If the test is for an in-development feature, we should tag it with `@QualityGateNewFeatureTest`.
