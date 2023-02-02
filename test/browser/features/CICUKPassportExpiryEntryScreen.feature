@mock-api:f2f-cic-success @success
Feature: Enter UK Passport Details  - Happy Path

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

Scenario: UK passport not expired (Happy path)
Given the UK Passport date entered is within accepted expiration window
When the user clicks the continue button on the UKPassportPage
Then the user is routed to the next screen in the journey Name Entry Screen 

#Scenario: UK passport expired (Unhappy path)
#Given the date entered is outside of the accepted expiration window
#When the user clicks the continue button
#Then the user is routed to the Expired Date Error Screen

#Scenario: Incorrect date format
#Given the user enters a date in the incorrect format
#When the user clicks the continue button
#Then the user is informed that they have entered a date in the incorrect format

#Scenario: Invalid input type
#Given Start to type your Given step here the user enters non-numeric values into the input fields (ex: 2£/3/2020)
#When the user clicks the continue button
#Then the user is informed that data entered is of the wrong type

#Scenario: Button redirect fails
#Given the next screen in the journey is unavailable
#When the user clicks the continue button
#Then the appropriate error page is retrieved and shown

#Scenario: Fields are pre-populated if info is included in shared claims
#Given shared claims file includes Passport expiry date
#When the user arrives on this screen
#Then the expiry date fields are pre-populated with the date in the shared claims file

#Scenario: Data entry character limit entered
#Given the user has already entered the maximum number of characters for an entry field (2 for day and month, 4 for year)
#When the user attempts to enter a new character
#Then the new character input is ignored and no additional characters are entered into the field