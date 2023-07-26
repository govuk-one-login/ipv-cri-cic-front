#!/usr/bin/env bash

set -eu

# The CFN variables seem to include quotes when used in tests these quotes must 
# be removed before assigning these variable.
remove_quotes () {
  echo "$1" | tr -d '"'
}

# Github actions set to true for tests to run in headless mode
export GITHUB_ACTIONS=true
# shellcheck disable=SC2154
export IPV_STUB_URL=$(remove_quotes $CFN_CICIPVStubExecuteURL)start

cd /app; yarn run test:browser:ci

cp -rf /app/test/reports $TEST_REPORT_ABSOLUTE_DIR
