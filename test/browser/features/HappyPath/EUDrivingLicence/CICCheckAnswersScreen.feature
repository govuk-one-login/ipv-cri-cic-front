@mock-api:f2f-cic-success @success
Feature: The user enters their date of birth to be used as part of their claimed identity


Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the landingPage

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the LandingPage
    Then the user is routed to the next screen in the journey PhotoId Selection

    Given the EU driving licence option is selected
    When the user clicks the EU driving licence button
    Then the user is routed to the EU DL Expiry Entry Screen

    Given the EU Driving Licence date entered is within accepted expiration window
    When the user clicks the continue button on the UKPassportPage
    Then the user is routed to the next screen in the journey Name Entry Screen

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey DOB Entry

    Given the DOB fields are populated with valid values
    When the user clicks the DoB continue button
    Then they are routed to the Check My Answers Screen


Scenario: Previously provided information successfully rendered on the page
Given the user has completed the previous CIC screens
#When the page is rendered
#Then fields for each of the previous screens are pre-populated with the data captured

#Scenario: Successful routing to IPV Core (Address CRI browser redirect)
#Given the user has finished changing the 
#When the Continuebutton is clicked
#Then the user is successfully routed to IPV Core for a redirect to Address CRI

#Scenario: Edit an answer given in a previous CIC screen 
#Given the user chooses to amend the information provided for a previous screen
#When the Editbutton corresponding to this screen is clicked
#Then the user is redirected to the relevant screen to enter the new information

#Scenario: Edited answers rendered when returning to “Check My Answers” Screen
#Given the user returned to a previous screen to edit an answer
#When the user returns to the Check My Answers Screen
#Then the amended information is rendered on the screen

#Scenario: User can choose to print the “Check My Answers Screen”
#Given the user wishes to print a copy of their answers
#When the “Print this page” button is clicked
#Then the browser print/pdf tool is rendered

#Scenario: Successful redirect to previous screen on “Back” button click
#Given the user wishes to navigate to the previous screen
#When the Backbutton is clicked
#Then the user is routed to the DOB Entry Screen
