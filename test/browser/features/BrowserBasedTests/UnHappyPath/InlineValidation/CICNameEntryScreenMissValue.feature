@mock-api:f2f-cic-success
Feature: The user enters their name to be used as part of their claimed identity


    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the nameEntry

    Scenario: Successful validation of Surname and First name fields
        Given only one mandatory name field has been entered
        When the user clicks the continue button in the NameEntry screen
        Then the user sees an inline error message displayed in the NameEntry screen