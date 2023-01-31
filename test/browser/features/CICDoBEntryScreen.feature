@mock-api:f2f-cic-success @success
Feature: The user enters their date of birth to be used as part of their claimed identity


Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the landingPage

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the LandingPage
    Then the user is routed to the next screen in the journey PhotoId Selection

    Given the UK passport option is selected
    When the user clicks the PhotoId continue button
    Then the user is routed to the next screen in the journey Passport Details

    Given the date entered is within accepted expiration window
    When the user clicks the continue button on the UKPassportPage
    Then the user is routed to the next screen in the journey Name Entry Screen

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey DOB Entry

Scenario: Successful redirect (Happy path)
Given the DOB fields are populated with valid values
When the user clicks the DoB continue button
Then they are routed to the Check My Answers Screen
 
##Scenario: Back button pressed (Happy path)
#Given the user wants to go back to the previous page they were on
#When the back button or browser back button is pressed
#Then the user is routed back to the previous screen: Name Entry Screen 
 
#Scenario: Missing user input (Unhappy path)
#Given any of the DOB fields are blank
#When the user clicks the continue button
#Then the user receives an error message
 
#Scenario: Invalid user input (Unhappy path)
#Given the user wants to continue to the next step in the journey
#And the format of any entry in any of the three fields does not comply with the validation rules
#When the user clicks the continue button
#Then the user receives an error message
 
#Scenario: Fields are pre-populated if info is included in shared claims
#Given shared claims file includes the user's date of birth
#When the user arrives on this screen
#Then the date of birth fields are pre-populated with the date in the shared claims file

#Scenario: Data entry character limit entered
#Given the user has already entered the maximum number of characters for an entry field (2 for day and month, 4 for year)
#When the user attempts to enter a new character
#Then the new character input is ignored and no additional characters are entered into the field