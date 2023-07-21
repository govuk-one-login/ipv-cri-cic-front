#!/usr/bin/env bash

set -eu

# The CFN variables seem to include quotes when used in tests these quotes must 
# be removed before assigning these variable.
remove_quotes () {
  echo "$1" | tr -d '"'
}

declare error_code
# Github actions set to true for tests to run in headless mode
export GITHUB_ACTIONS=true
# shellcheck disable=SC2154
#export IPV_STUB_URL=$(remove_quotes $CFN_CICIPVStubExecuteURL)start
#https://ipvstub.review-c.build.account.gov.uk/start
export IPV_STUB_URL="https://ipvstub.review-c.dev.account.gov.uk/start"

echo "IPV Stub URL $IPV_STUB_URL"

cd ./app; npm run test:browser:ci
error_code=$?

cp -rf /app/test/reports $TEST_REPORT_ABSOLUTE_DIR

exit $error_code
