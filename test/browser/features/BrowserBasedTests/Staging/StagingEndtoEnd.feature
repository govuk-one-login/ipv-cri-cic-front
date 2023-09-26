@success @stg

Feature: F2F Journey - E2E

Scenario: F2F Journey - E2E Happy Path and DB Validation
    Given the user navigates to the Orchestrator Stub Page
    When the user signs in using a random userId
    And the user decides to prove their identity using F2F
    And "Kenneth Decerqueira" enters their CIC details 
    And "Kenneth Decerqueira" enters their Address CRI details 
    And the user completes their Fraud CRI check
    And "Kenneth Decerqueira" enters their F2F CRI details 
    Then the user should be shown the F2F handoff page

