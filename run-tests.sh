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
export TEST_HARNESS_URL=$(remove_quotes "$CFN_CICTestHarnessURL")
export API_BASE_URL=$(remove_quotes "$CFN_CICBackEndURL")
export SESSION_TABLE=$(remove_quotes "$CFN_CICBackendSessionTableName")
export LANGUAGE_TOGGLE_DISABLED=false

declare error_code

# disabling error_check to allow report generation for successful + failed tests
set +e
cd /app; yarn run test:e2e:cd
error_code=$?
cp -rf /app/test/reports $TEST_REPORT_ABSOLUTE_DIR
if [ $error_code -ne 0 ]
then
  exit $error_code
fi

sleep 2m

set -eapt-get install jq -y
cd /app; npm run test:pii
error_code=$?

exit $error_code