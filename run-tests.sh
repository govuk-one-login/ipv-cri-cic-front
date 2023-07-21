#!/usr/bin/env bash

set -eu

remove_quotes () {
  echo "$1" | tr -d '"'
}

declare error_code

# shellcheck disable=SC2154
CFN_CIC_FRONTEND_URL_NOQUOTES=$(remove_quotes "$CFN_CICCustomDomain")
export CFN_CIC_FRONTEND_URL_NOQUOTES=`echo ${CFN_CIC_FRONTEND_URL_NOQUOTES}`
echo $CFN_CIC_FRONTEND_URL_NOQUOTES

cd test/waf
npm run test:api

error_code=$?
exit $error_code
