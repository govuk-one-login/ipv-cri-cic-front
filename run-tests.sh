#!/usr/bin/env bash

set -eu

# The CFN variables seem to include quotes when used in tests these quotes must 
# be removed before assigning them.
remove_quotes () {
  echo "$1" | tr -d '"'
}

declare error_code
# shellcheck disable=SC2154
export IPV_STUB_URL=https://ipvstub.review-c.$ENVIRONMENT.account.gov.uk/start 

cd /app; npm run test:browser:ci
error_code=$?

cp -rf /app/test/reports $TEST_REPORT_ABSOLUTE_DIR

exit $error_code
