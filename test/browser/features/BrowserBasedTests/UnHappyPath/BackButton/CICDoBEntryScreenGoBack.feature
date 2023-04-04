@mock-api:f2f-cic-success @success @nonUK
Feature: The user enters their date of birth to be used as part of their claimed identity

Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the nameEntry

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey DOB Entry

Scenario: Successful redirect from DoB Entry to previous page
    Given the user has navigated to the DoB Entry page 
    When the Back link is clicked on the DoB Entry page
    Then the user is navigated back to the screen that they came from - Name Entry
