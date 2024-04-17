const { Given, Then, When } = require("@cucumber/cucumber");

const { expect } = require("chai");

const ApiSupport = require("../support/ApiSupport");

const TestHarness = require("../support/TestHarness");

Given(
  /^I have retrieved the sessionTable data for my CIC session$/,
  { timeout: 2 * 50000 },
  async function () {
    const testHarness = new TestHarness();
    const authCodeDetails = await testHarness.getSessionByAuthCode(
      this.authCode,
    );

    expect(authCodeDetails.authorizationCode).to.equal(this.authCode);
    this.sessionId = authCodeDetails.sessionId;
    const session = await testHarness.getSession(this.sessionId);
    this.authSessionState = session.authSessionState;
    this.authorizationCode = session.authorizationCode;
    this.redirectUri = session.redirectUri;
    this.journey = session.journey;
  },
);

Then(
  /^the Verifiable Credential is correctly returned by the userInfo endpoint$/,
  { timeout: 2 * 50000 },
  async function () {
    const apiSupport = new ApiSupport(process.env.API_BASE_URL);
    const tokenRequest = await apiSupport.tokenPostRequest(
      this.authorizationCode,
      this.redirectUri,
    );
    const userInfoRequest = await apiSupport.userInfoPostRequest(
      tokenRequest.data.access_token,
    );
    const jwtToken = await apiSupport.getJwtTokenUserInfo(
      JSON.stringify(userInfoRequest.data),
    );
    await apiSupport.validateJwtToken(jwtToken);
  },
);

When(
  /^I get all TxMA events from Test Harness$/,
  { timeout: 2 * 50000 },
  async function () {
    const testHarness = new TestHarness();
    let sqsMessage;
    do {
      sqsMessage = await testHarness.getSqsEventList(
        "txma/",
        this.sessionId,
        4,
      );
    } while (!sqsMessage);

    this.allTxmaEventBodies = await testHarness.getTxMAEventData(sqsMessage);
  },
);

Then(
  "the {string} event matches the {string} Schema",
  { timeout: 2 * 50000 },
  async function (eventName, schemaName) {
    const testHarness = new TestHarness();
    await testHarness.validateTxMAEventData(
      this.allTxmaEventBodies,
      eventName,
      schemaName,
    );
  },
);
