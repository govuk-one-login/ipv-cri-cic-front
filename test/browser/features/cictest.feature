@mock-api:f2f-cic-success @success
Feature: Happy path

  Viewing the Knowledge Based Verification questions successfully

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details

  @mock-api:f2f-cic-success
  Scenario: Run CiC check
    Given they have started the CiC journey
    And they can see the landing page
    When they continue on landing page
   # Then they should be redirected as a success
    Then they should be redirected to photoID page

 