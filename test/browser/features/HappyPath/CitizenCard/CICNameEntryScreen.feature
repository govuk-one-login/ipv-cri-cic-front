@mock-api:f2f-cic-success @success @nonUK
Feature: The user enters their name to be used as part of their claimed identity


    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the landingPage

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the LandingPage
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen in the journey Other Passport Details

        Given the date entered is within accepted Non UK expiration window
        When the user clicks the continue button on the Non UK passport page
        Then the user is routed to the next screen in the NonUKPassport journey - Name Entry

    Scenario: Successful validation of Surname and First name fields
        Given there has been an entry into the surname and first name fields
        When the user clicks the NameEntry continue button
        Then the user is routed to the next screen in the journey DOB Entry

#Scenario: Missing mandatory surname field
#Given there has not been an entry into the surname field
#And the firstName field has been correctly populated
#When the user clicks the continue button
#Then the user receives an error message due to the missing entry into the surname field

#Scenario: Missing mandatory first name field
#Given there has not been an entry into the first name field
#And the surname field has been correctly populated
#When the user clicks the continue button
#Then the user receives an error message due to the missing entry into the first name field

#Scenario: Invalid user input
#Given any entry in any of the three fields does not comply with the character requirements
#When the user clicks the continue button
#Then the user receives an error message

#Scenario: Fields are pre-populated if info is included in shared claims
#Given shared claims file includes the users name
#When the user arrives on this screen
#Then the name fields are pre-populated with the name in the shared claims file