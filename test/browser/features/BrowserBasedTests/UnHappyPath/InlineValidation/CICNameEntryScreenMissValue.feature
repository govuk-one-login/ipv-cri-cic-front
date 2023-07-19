@mock-api:f2f-cic-success @browser
Feature:Error messgae is displayed when no name data is entered


    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the nameEntry


    Scenario: Successful validation of Surname and First name fields
        Given only one mandatory name field has been entered
        When the user clicks the continue button in the NameEntry screen
        Then the user sees an inline error message displayed in the NameEntry screen

    Scenario: Successful validation of Surname and First name fields - Invalid Character firstName
        Given an Invalid Character has been entered in the firstName field
        When the user clicks the continue button in the NameEntry screen
        Then the user sees an inline error message displayed in the NameEntry screen for firstName

    Scenario: Successful validation of Surname and First name fields - Invalid Character lastName
        Given an Invalid Character has been entered in the lastName field
        When the user clicks the continue button in the NameEntry screen
        Then the user sees an inline error message displayed in the NameEntry screen for lastName

    Scenario: Successful validation of Surname and First name fields - Numerical Value firstName
        Given a Numerical Value has been entered in the firstName field
        When the user clicks the continue button in the NameEntry screen
        Then the user sees an inline error message displayed in the NameEntry screen for firstName

    Scenario: Successful validation of Surname and First name fields - Numerical Value lastName
        Given a Numerical Value has been entered in the lastName field
        When the user clicks the continue button in the NameEntry screen
        Then the user sees an inline error message displayed in the NameEntry screen for lastName



