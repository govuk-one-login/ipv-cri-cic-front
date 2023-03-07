@mock-api:f2f-cic-success @success
Feature: Happy path

 E2E journey for Face-to-Face path Landing Page start

  Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the landingPage


  Scenario: Continue button redirect successful
    Given the user wants to view their nearest post office that offers ID verification
    When the user clicks on the hyperlink
    Then they are redirected to the PO's own branch checking page
