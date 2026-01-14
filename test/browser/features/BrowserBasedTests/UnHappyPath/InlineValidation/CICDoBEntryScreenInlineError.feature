@mock-api:f2f-cic-success @success @browser
Feature: Error Message displayed when wrong DoB is entered


    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the CIC nameEntry

        Given there has been an entry into the surname and first name fields
        When the user clicks the NameEntry continue button
        Then the user is routed to the next screen in the journey DOB Entry

    Scenario: Invalid input type
        Given the user clicks the continue button only on the DoBEntryPage
        Then the user sees an inline error message displayed on the DoBEntryPage