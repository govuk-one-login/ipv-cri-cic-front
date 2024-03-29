@mock-api:f2f-cic-success @success @browser
Feature: Successful navigation using Change and Back button - Name Entry


    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the F2F nameEntry

        Given there has been an entry into the surname and first name fields
        When the user clicks the NameEntry continue button
        Then the user is routed to the next screen in the journey DOB Entry

        Given the DOB fields are populated with valid values
        When the user clicks the DoB continue button
        Then they are routed to the Check My Answers Screen


    Scenario: Successful redirect from CMA screen back to name entry and back to CMA screen
        Given the user has navigated to Check my Answers page
        When the name entry edit link is clicked
        Then the user is navigated back to the name entry page
        Then the user clicks continue on the Name Entry page
        Then the user navigates back to the Check My Answers Page


    Scenario: Successful redirect to previous screen on “Back” button click
        When the Back button is clicked
        Then the user is routed to the screen they were previously on
