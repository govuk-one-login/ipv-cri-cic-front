# di-ipv-cri-cic-front

Frontend for the Claimed Identity Collector (CIC) journey within GOV.UK One Login IPV.

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

---

## Quick links
- **Environment sample:** `.env.sample`
- **App source:** `src/`
- **Infra template:** `template.yaml`
- **Axios middleware:** `src/lib/axios/`
- **Code owners:** `CODEOWNERS` (if present)

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

## Environment file (.env)
All required environment variables are listed in `.env.sample`. Copy it to `.env` and set values for the environment you are testing against.

```sh
cp .env.sample .env
```

> [!IMPORTANT]
> Do not commit `.env` and do not add real environment hostnames, tokens, or secret values to this README.

Common variables (see `.env.sample` for the full list):

- `API_BASE_URL` – base URL for the CIC backend API.
- `IPV_STUB_URL` – IPV stub URL used to start test journeys.
- `PORT` – local port (default 5020).
- `SESSION_SECRET` – session secret (treat as sensitive; do not commit).
- `CUSTOM_FE_URL` – optional; set to `http://localhost:5020` to run browser tests against local changes.

Analytics flags/IDs:

- `GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID`
- `UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID`
- `GA4_ENABLED`, `UA_ENABLED`
- `ANALYTICS_DATA_SENSITIVE`
- `GA4_PAGE_VIEW_ENABLED`, `GA4_FORM_RESPONSE_ENABLED`, `GA4_FORM_ERROR_ENABLED`, `GA4_FORM_CHANGE_ENABLED`
- `GA4_NAVIGATION_ENABLED`, `GA4_SELECT_CONTENT_ENABLED`
- `LANGUAGE_TOGGLE_DISABLED`

## Running locally against a deployed back end
Set up your `.env` based on `.env.sample` (ensure `API_BASE_URL` and `IPV_STUB_URL` are set).

Build and start the app:

```sh
yarn build
yarn start
```

Start a journey via the IPV stub:

Make a POST call to `IPV_STUB_URL` with the following payload:

```json
{
  "frontendURL": "http://localhost:5020"
}
```

Navigate to the `AuthorizeLocation` returned in the stub response.

> [!NOTE]
> IPV stub request/response shapes are owned by the stub service. Use your team’s internal documentation for environment-specific URLs and details.

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
- A Page Object Model approach (see Playwright docs)

## Deployment
The standard deployment route is via the CI/CD pipeline for this repository. Use local deployments only when explicitly required by your team/process.

### Deploying a personal stack (exceptional)
If you must deploy an isolated FE stack (for example for testing an infra change), use a custom stack name (include your initials) to avoid overwriting shared stacks.

> [!IMPORTANT]
> Do not document environment-specific parameter values, account identifiers, or internal hostnames in this public repository. Use your organisation’s internal runbooks for those details.

A typical deployment shape (placeholders only):

```sh
sam build --parallel --no-cached
sam deploy --resolve-s3 --stack-name "<stack-name>" --capabilities CAPABILITY_IAM --confirm-changeset --parameter-overrides \
"Environment=\"<environment>\" PermissionsBoundary=\"<permissions-boundary>\" VpcStackName=\"<vpc-stack-name>\" EnableScalingInDev=0"
```

Autoscaling-related parameters (if supported by the template):

- `EnableScalingInDev` – default 0; set 1 to deploy scaling resources.
- `MinContainerCount` – default 3.
- `MaxContainerCount` – default 12.

### Custom FE image build and push (optional)
Only follow this if your team supports building and deploying a custom FE image (otherwise, deployments are via the pipeline).

```sh
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com
docker build --platform linux/amd64 -t di-ipv-cri-cic-front:<image-tag> .
docker tag di-ipv-cri-cic-front:<image-tag> <aws-account-id>.dkr.ecr.<region>.amazonaws.com/<ecr-repo>:<image-tag>
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/<ecr-repo>:<image-tag>
```

If deploying a custom image, update the `Image:` reference in `template.yaml` and deploy via your team-approved approach.

## Request properties
A shared axios middleware is used for API calls; see `src/lib/axios/`. This attaches an axios instance to each request (e.g. `req.axios`) to promote consistent header use and request behaviour.

## Code owners
If a `CODEOWNERS` file is present at the repo root, PRs require review by code owners.

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
This repository does not currently publish a LICENSE/LICENCE file. If you need reuse/distribution terms, consult the owning organisation’s guidance before redistributing.
