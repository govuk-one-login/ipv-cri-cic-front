@success @e2e

Feature: Claimed Identity Credential Issuer - E2E

Scenario: Claimed Identity Credential Issuer - E2E Happy Path and DB Validation (Face to Face Journey)
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the F2F nameEntry

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey DOB Entry

    Given the DOB fields are populated with valid values
    When the user clicks the DoB continue button
    Then they are routed to the Check My Answers Screen
    Given the user has completed the previous CIC screens
    When the user clicks the Check My Answers Submit button

    Given I have retrieved the sessionTable data for my CIC session
    Then session details are correctly stored in DB for a "FACE_TO_FACE" journey
    Then the Verifiable Credential is correctly returned by the userInfo endpoint
    When I get all TxMA events from Test Harness
    Then the "CIC_CRI_START" event matches the "CIC_CRI_START_SCHEMA" Schema
    And the "CIC_CRI_AUTH_CODE_ISSUED" event matches the "CIC_CRI_AUTH_CODE_ISSUED_SCHEMA" Schema
    And the "CIC_CRI_VC_ISSUED" event matches the "CIC_CRI_VC_ISSUED_SCHEMA" Schema
    And the "CIC_CRI_END" event matches the "CIC_CRI_END_SCHEMA" Schema

Scenario: Claimed Identity Credential Issuer - E2E Happy Path and DB Validation (No Photo ID Journey)
    Given Validating Valerie is using the system
    When they have provided their details
    Then they should be redirected to the BAV nameEntry

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey DOB Entry

    Given the DOB fields are populated with valid values
    When the user clicks the DoB continue button
    Then they are routed to the Check My Answers Screen
    Given the user has completed the previous CIC screens
    When the user clicks the Check My Answers Submit button

    Given I have retrieved the sessionTable data for my CIC session
    Then session details are correctly stored in DB for a "NO_PHOTO_ID" journey
    Then the Verifiable Credential is correctly returned by the userInfo endpoint
    When I get all TxMA events from Test Harness
    Then the "CIC_CRI_START" event matches the "CIC_CRI_START_BANK_ACCOUNT_SCHEMA" Schema
    And the "CIC_CRI_AUTH_CODE_ISSUED" event matches the "CIC_CRI_AUTH_CODE_ISSUED_SCHEMA" Schema
    And the "CIC_CRI_VC_ISSUED" event matches the "CIC_CRI_VC_ISSUED_SCHEMA" Schema
    And the "CIC_CRI_END" event matches the "CIC_CRI_END_SCHEMA" Schema