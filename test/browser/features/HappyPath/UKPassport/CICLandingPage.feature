@mock-api:f2f-cic-success @success
Feature: Happy path

 E2E journey for Face-to-Face path Landing Page start

  Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the landingPage

  Scenario: Continue button redirect successful
    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the LandingPage
    Then the user is routed to the next screen in the journey PhotoId Selection
