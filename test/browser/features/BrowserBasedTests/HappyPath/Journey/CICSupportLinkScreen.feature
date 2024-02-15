@mock-api:f2f-cic-success @success @browser
Feature: The user want to access GOV UK support link 

Scenario: Successful redirect to support link from BAV page
    Given Validating Valerie is using the system
    When the user clicks the GOV UK support Link
    Then they should be redirected to the GOV UK support page 

Scenario: Successful redirect to support link from F2F page
    Given Authenticatable Anita is using the system
    When the user clicks the GOV UK support Link
    Then they should be redirected to the GOV UK support page 



