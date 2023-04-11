# @mock-api:f2f-cic-success @success
# Feature: Enter National Identity Card from an EEA country - Happy Path

#     Background:
#         Given Authenticatable Anita is using the system
#         When they have provided their details
#         Then they should be redirected to the landingPage

#         Given the user wants to progress to the next step of the journey
#         When the user clicks the continue button on the LandingPage
#         Then the user is routed to the next screen in the journey PhotoId Selection

#         Given the National Identity Card EEA option is selected
#         When the user clicks the continue button with National Identity Card EEA selected
#         Then the user is routed to the next screen in the National Identity Card EEA journey - National Identity Card EEA details

    
#     Scenario: National Identity Card from an EEA country expired (UnHappy path)
#         Given the date entered is beyond the accepted National Identity Card EEA expiration window
#         When the user clicks the continue button on the National Identity Card EEA Future details Page
#         Then the user sees an inline error on the National Identity Card EEA Screen