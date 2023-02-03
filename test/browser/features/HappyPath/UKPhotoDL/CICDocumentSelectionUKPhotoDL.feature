@mock-api:f2f-cic-success @success
Feature: Build Document Selection Screen

  Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the landingPage

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the LandingPage
    Then the user is routed to the next screen in the journey PhotoId Selection
    
Scenario: Successful redirect on UK driving licence selection (Happy path)
Given the UK photocard driving licence option is selected
When the user clicks the UK DL continue button
Then the user is routed to the next screen in the journey UKPhotoDL Expiry Date
