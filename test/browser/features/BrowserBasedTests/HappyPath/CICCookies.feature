@browser

Feature: Claimed Identity Credential Issuer Device Intelligence Cookie

    Scenario: Claimed Identity Credential Issuer - Device Intelligence Cookie
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        And the "di-device-intelligence" cookie has been set