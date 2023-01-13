@mock-api:f2f-cic-success @success
Feature: Happy path

 E2E journey for Face-to-Face path Landing Page start

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details

  @mock-api:f2f-cic-success
  Scenario: Run CiC check
    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button
    Then the user is routed to the next screen in the journey

 