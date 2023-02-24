@mock-api:f2f-cic-success @success
Feature: Enter UK driving licence   - Happy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the landingPage

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the LandingPage
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the BRP option is selected
        When the user clicks the BRP continue button
        Then the user is routed to the next screen in the journey BRP Expiry Date

    Scenario: BRP not expired (Happy path)
        Given the date entered is within accepted BRP expiration window
        When the user clicks the continue button on the BRP Page
        Then the user is routed to the next screen in the BRP journey - Name Entry