@success @stg @QualityGateIntegrationTest @QualityGateRegressionTest

Feature: F2F Journey Staging

  Background:
    Given the user navigates to the Orchestrator Stub Page
    When the user signs in using a random userId
    And the user decides to prove their identity using F2F

Scenario: E2E Staging Journey - E2E Happy Path Kenneth Decerqueira
    And "Kenneth Decerqueira" enters their CIC details 
    And "Kenneth Decerqueira" enters their Address CRI details 
    And the user completes their Fraud CRI check
    Then the user should see the full list of document types
    And "Kenneth Decerqueira" enters their F2F CRI details 
    Then the user should be shown the F2F handoff page

Scenario: Staging Journey - E2E Unhappy Path Alexandra Elegba Thin File
    And "Alexandra Elegba" enters their CIC details 
    And "Alexandra Elegba" enters their Address CRI details 
    And the user completes their Fraud CRI check
    Then the user should see a limited list of document types

