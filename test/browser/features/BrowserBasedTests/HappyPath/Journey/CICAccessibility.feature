@success @browser

Feature: Claimed Identity Credential Issuer - Accessibility 

Scenario: Claimed Identity Credential Issuer - Accessibility Validation (Face to Face Journey)
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the CIC nameEntry
    And the page should conform to WCAG 2.2 AA guidelines

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey DOB Entry
    And the page should conform to WCAG 2.2 AA guidelines


    Given the DOB fields are populated with valid values
    When the user clicks the DoB continue button
    Then they are routed to the Check My Answers Screen
    And the page should conform to WCAG 2.2 AA guidelines

Scenario: Claimed Identity Credential Issuer - Accessibility Validation (No Photo ID Journey)
    Given Validating Valerie is using the system
    When they have provided their details
    Then they should be redirected to the BAV nameEntry
    And the page should conform to WCAG 2.2 AA guidelines

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey No Photo Id DOB Entry
    And the page should conform to WCAG 2.2 AA guidelines

    Given the DOB fields are populated with valid values
    When the user clicks the DoB continue button
    Then they are routed to the No Photo ID Check My Answers Screen
    And the page should conform to WCAG 2.2 AA guidelines

Scenario: Claimed Identity Credential Issuer - Accessibility Validation (Low Confidence Journey)
    Given a Low Confidence user is using the system
    When they have provided their details
    Then they should be redirected to the Low Confidence nameEntry
    And the page should conform to WCAG 2.2 AA guidelines

    Given there has been an entry into the surname and first name fields
    When the user clicks the NameEntry continue button
    Then the user is routed to the next screen in the journey Low Confidence DOB Entry
    And the page should conform to WCAG 2.2 AA guidelines

    Given the DOB fields are populated with valid values
    When the user clicks the DoB continue button
    Then they are routed to the Low Confidence Check My Answers Screen
    And the page should conform to WCAG 2.2 AA guidelines