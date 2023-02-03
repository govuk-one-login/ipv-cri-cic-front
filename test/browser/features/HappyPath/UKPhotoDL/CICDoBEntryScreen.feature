@mock-api:f2f-cic-success @success
Feature: The user enters their date of birth to be used as part of their claimed identity


    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the landingPage

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the LandingPage
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK photocard driving licence option is selected   
        When the user clicks the UK DL continue button
        Then the user is routed to the next screen in the journey UKPhotoDL Expiry Date

        Given the date entered is within accepted UKPhotoDL expiration window
        When the user clicks the continue button on the UKPhotoDL Page
        Then the user is routed to the next screen in the UKPhotoDL journey - Name Entry

        Given there has been an entry into the surname and first name fields
        When the user clicks the NameEntry continue button
        Then the user is routed to the next screen in the journey DOB Entry


    Scenario: Successful redirect (Happy path)
        Given the DOB fields are populated with valid values
        When the user clicks the DoB continue button
        Then they are routed to the Check My Answers Screen