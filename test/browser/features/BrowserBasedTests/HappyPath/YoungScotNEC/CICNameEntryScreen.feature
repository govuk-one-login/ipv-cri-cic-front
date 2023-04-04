# @mock-api:f2f-cic-success @success @ukPass
# Feature: The user enters their name to be used as part of their claimed identity


# Background:
#     Given Authenticatable Anita is using the system
#     When they have provided their details
#     Then they should be redirected to the nameEntry

#     Given the user wants to progress to the next step of the journey
#     When the user clicks the continue button on the LandingPage
#     Then the user is routed to the next screen in the journey PhotoId Selection

#     Given the Young Scot NEC option is selected
#     When the user clicks the PhotoId continue button with Young Scot NEC selected
#     Then the user is routed to the next screen in the Young Scot NEC journey - Young Scot NEC details

#     Given the name entered is within accepted Name Entry validation
#     When the user clicks the continue button on the Name Entry Page
#     Then the user is routed to the next screen in the CIC journey Date of Birth Screen


# Scenario: Successful validation of Surname and First name fields
# Given there has been an entry into the surname and first name fields
# When the user clicks the NameEntry continue button
# Then the user is routed to the next screen in the journey DOB Entry
