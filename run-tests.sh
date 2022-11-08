#! /bin/sh
set -eu

export OAUTH_ENABLED=true
cd /app

! yarn install
! yarn build
! yarn test:unit:ci --ci

# This should take the results and move them into the folder that the CD system will then report on them from
cp results.xml $TEST_REPORT_ABSOLUTE_DIR/ ## This is set in the pipeline as the place where all test results outputs should be set.
