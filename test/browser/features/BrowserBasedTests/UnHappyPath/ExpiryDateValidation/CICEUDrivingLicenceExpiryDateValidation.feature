@mock-api:f2f-cic-success @success
Feature: Enter EU driving licence - Happy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the landingPage

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the LandingPage
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the EU driving licence option is selected
        When the user clicks the EU driving licence button
        Then the user is routed to the EU DL Expiry Entry Screen

    @test
    Scenario: EU driving licence expired (UnHappy path)
        Given the date entered is outside the accepted EU driving licence expiration window
        When the user clicks the continue button on the EU driving licence page
        Then the user sees an inline error message displayed on the EU DL Page