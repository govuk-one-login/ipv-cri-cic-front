# @mock-api:f2f-cic-success @success
# Feature: The user enters their date of birth to be used as part of their claimed identity


#     Background:
#         Given Authenticatable Anita is using the system
#         When they have provided their details
#         Then they should be redirected to the landingPage

#         Given the user wants to progress to the next step of the journey
#         When the user clicks the continue button on the LandingPage
#         Then the user is routed to the next screen in the journey PhotoId Selection

#         Given the Other passport option is selected
#         When the user clicks the continue button with Non UK passport selected
#         Then the user is routed to the next screen - OtherPassport Details

#         Given the date entered is within accepted Non UK expiration window
#         When the user clicks the continue button on the Non UK passport page
#         Then the user is routed to the next screen in the NonUKPassport journey - Name Entry

#         Given there has been an entry into the surname and first name fields
#         When the user clicks the NameEntry continue button
#         Then the user is routed to the next screen in the journey DOB Entry

#         Given the DOB fields are populated with valid values
#         When the user clicks the DoB continue button
#         Then they are routed to the Check My Answers Screen
    
    
#     Scenario: Successful redirect from CMA screen back to document selection, expiry date entry then back to CMA screen
#         Given the user has navigated to Check My Answers page
#         When the change ID link is clicked
#         Then the user is navigated back to the document selection page
#         Then a different ID type is selected
#         Then the user clicks continue with a different ID type selected
#         Then the user navigates to ID expiry screen
#         Then the user enters a date within the expiry window
#         Then the user clicks continue
#         Then the user is navigated back to the Check My Answers screen
