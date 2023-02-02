@mock-api:f2f-cic-success @success @ukPass
Feature: Happy path

 E2E journey for Face-to-Face path Landing Page start

  Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the landingPage

  Scenario: Continue button redirect successful
    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the LandingPage
    Then the user is routed to the next screen in the journey PhotoId Selection

 
#Scenario: Continue button redirect fails
#Given the user wants to go back or continue to the next stage of the journey
#And this resource is unavailable
#When the user clicks the continue button
#Then the appropriate error page is retrieved and shown

#Scenario: IPV core triage redirect
#Given the user wants to prove their identity another way
#When they click on the hyperlink
#Then they are redirected to the IPV core triage page

#Scenario: Nearest post office redirect
#Given the user wants to view their nearest post office that offers ID verification
#When they click on the hyperlink
#Then they are redirected to the PO's own branch checking page