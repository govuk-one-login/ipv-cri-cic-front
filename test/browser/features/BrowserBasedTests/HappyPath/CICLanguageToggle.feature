@browser

Feature: Claimed Identity Credential Issuer Language Toggle

    Scenario: Claimed Identity Credential Issuer - Language Toggle Validation
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the CIC nameEntry
        And the language toggle is present on the screen

        Given there has been an entry into the surname and first name fields
        When the user clicks the NameEntry continue button
        Then the user is routed to the next screen in the journey DOB Entry
        And the language toggle is present on the screen

        Given the DOB fields are populated with valid values
        When the user clicks the DoB continue button
        Then they are routed to the Check My Answers Screen
        And the language toggle is present on the screen
        Given the user has completed the previous CIC screens
        When the user clicks the Check My Answers Submit button

    Scenario: HTML Tag and Hyperlink updated when Language is changed
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the CIC nameEntry
        And the language toggle is present on the screen
        When the user switches language to "Cymraeg"
        Then The HTML Language Attribute is set to "cy"
        And the language toggle updates the "Cymraeg" hyperlink
        When the user switches language to "English"
        Then The HTML Language Attribute is set to "en"
        And the language toggle updates the "English" hyperlink
