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
export API_BASE_URL=http://localhost:8090
export IPV_STUB_URL=$(remove_quotes $CFN_CICIPVStubExecuteURL)start
export TEST_HARNESS_URL=$(remove_quotes "$CFN_CICTestHarnessURL")
export CRI_F2F_API_URL=$(remove_quotes "$CFN_CICBackendURL")
export SESSION_TABLE=session-cic-cri-ddb

cd /app; yarn run test:e2e:cd

cp -rf /app/test/reports $TEST_REPORT_ABSOLUTE_DIR
