Feature: Build Document Selection Screen

@mock-api:f2f-cic-success
Scenario: Successful redirect on 'UK passport' selection (Happy path)
Given the UK passport option is selected
#When the user clicks the continue button
#Then the user is routed to the next screen in the journey: Passport Expiry Entry Screen

#Scenario: Successful redirect on 'BRP' selection (Happy path
#Given the BRP option is selected
#When the user clicks the continue button
#Then the user is routed to the next screen in the journey: BRP Expiry Entry Screen

#Scenario: Successful redirect on UK driving licence selection (Happy path)
#Given the UK driving licence option is selected
#When the user clicks the continue button
#Then the user is routed to the next screen in the journey: UK driving Licence Expiry Entry Screen

#Scenario: Successful redirect on 'Non UK passport' selection (Happy path)
#Given the Other passport option is selected
#When the user clicks the continue button
#Then the user is routed to the next screen in the journey: Other Passport Expiry Entry Screen

#Scenario: Redirect if none of the documents available (Happy path)
#Given the user has none of the eligible identity documents
#When the user clicks the "I do not have any of these documents" hyperlink
#Then the user is routed to https://signin.account.gov.uk/no-photo-id

#Scenario: Attempt to select multiple options
#Given an option from the list has already been selected
#When the user clicks on another option
#Then the user's first choice is unselected and the second choice is selected

#Scenario: No redirect without a selection
#Given the user has not selected an option from the list
#When the user clicks the continue button
#Then the user is not routed to another screen
#And the user is informed that must make a selection in order to continue