@mock-api:f2f-cic-success @success @ukPass @browser
Feature: The user enters their name to be used as part of their claimed identity

Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the nameEntry

Scenario: Successful validation of Surname and First name fields
Given there has been an entry into the surname and first name fields
When the user clicks the NameEntry continue button
Then the user is routed to the next screen in the journey DOB Entry

Scenario: Successful validation of Surname and First name fields with Space
Given there has been an entry containing a space into the surname and first name fields
When the user clicks the NameEntry continue button
Then the user is routed to the next screen in the journey DOB Entry

Scenario: Successful validation of Surname and First name fields with Hyphen
Given there has been an entry containing a hyphen into the surname and first name fields
When the user clicks the NameEntry continue button
Then the user is routed to the next screen in the journey DOB Entry

Scenario: Successful validation of Surname and First name fields with Hyphen
Given there has been an entry containing a dot into the surname and first name fields
When the user clicks the NameEntry continue button
Then the user is routed to the next screen in the journey DOB Entry

