@mock-api:f2f-cic-success @success @browser
Feature: The user enters an invalid name to be used as part of their claimed identity

Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the nameEntry

Scenario: Error displayed for invalid name entry
    Given there has been an invalid entry into the surname, middle name and first name fields
    When the user clicks the NameEntry continue button
    Then the user is shown an error message for invalid names