@mock-errors
Feature: Error handling

  API Errors in middle of journey

  Background:
    Given Error Ethem is using the system
    And they have provided their details

  @mock-api:cic-session-error
  Scenario: Session error
    Given they have started the CIC journey
    And there is an immediate error
    Then they should see the unrecoverable error page
