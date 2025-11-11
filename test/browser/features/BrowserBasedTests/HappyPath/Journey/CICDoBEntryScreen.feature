@mock-api:f2f-cic-success @success @browser
Feature: The user enters their Date of Birth as part of their claimed identity

Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the CIC nameEntry

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey DOB Entry


Scenario: Successful redirect (Happy path)
Given the DOB fields are populated with valid values
When the user clicks the DoB continue button
Then they are routed to the Check My Answers Screen
