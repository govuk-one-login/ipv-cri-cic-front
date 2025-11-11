@device_intelligence_unhappy

Feature: Claimed Identity Credential Issuer Device Intelligence Cookie - Negative Path

    Scenario: Claimed Identity Credential Issuer - Device Intelligence Cookie
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the CIC nameEntry
        And the "di-device-intelligence" cookie has not been set