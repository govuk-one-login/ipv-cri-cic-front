@mock-api:f2f-cic-success @success @only
Feature: Claimed Identity Credential Issuer - E2E

@test
Scenario: Claimed Identity Credential Issuer - E2E Happy Path and DB Validation
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the nameEntry

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey DOB Entry

    Given the DOB fields are populated with valid values
    When the user clicks the DoB continue button
    Then they are routed to the Check My Answers Screen
    Given the user has completed the previous CIC screens
    When the user clicks the Check My Answers Submit button

    Given I have retrieved the sessionTable data for my CIC session
    Then session details are correctly stored in DB