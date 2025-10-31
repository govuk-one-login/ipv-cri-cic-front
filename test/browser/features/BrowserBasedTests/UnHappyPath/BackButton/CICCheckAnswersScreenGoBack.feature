@mock-api:f2f-cic-success @success @browser
Feature: Successful navigation using the Back button on the CMA screen


Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the CIC nameEntry

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey DOB Entry

    Given the DOB fields are populated with valid values
    When the user clicks the DoB continue button
    Then they are routed to the Check My Answers Screen

Scenario: Successful redirect from Check My Answers screen back to previous screen
    Given the user has navigated to the Check My Answers page
    When the Back link is clicked on the Check My Answers page
    Then the user is navigated back to the DOB Entry page
