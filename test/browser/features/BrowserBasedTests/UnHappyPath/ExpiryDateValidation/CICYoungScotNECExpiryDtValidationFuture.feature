@mock-api:f2f-cic-success @success
Feature: Enter Young Scot NEC   - Happy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the landingPage

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the LandingPage
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Young Scot NEC option is selected
        When the user clicks the PhotoId continue button with Young Scot NEC selected
        Then the user is routed to the next screen in the Young Scot NEC journey - Young Scot NEC details


    Scenario: Young Scot NEC expired (UnHappy path)
        Given the date entered is beyond the accepted Young Scot NEC expiration window
        When the user clicks the continue button on the Young Scot NEC Future Page
        Then the user sees an inline error message displayed on the Young Scot NEC Screen