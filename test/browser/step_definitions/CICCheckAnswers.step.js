const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage } = require("../pages");

const ApiSupport = require("../support/ApiSupport");

const TestHarness = require("../support/TestHarness");

Given(/^the user has completed the previous CIC screens$/, async function () {
  const cpdPage = new CheckDetailsPage(await this.page);
  expect(await cpdPage.isCurrentPage()).to.be.true;
});

When(
  /^the user clicks the Check My Answers Submit button$/,
  { timeout: 2 * 50000 },
  async function () {
    const cmPage = new CheckDetailsPage(await this.page);

    await cmPage.continue();
    this.state = await cmPage.setSessionState();
    this.authCode = await cmPage.setAuthCode();
  },
);

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
  "session details are correctly stored in DB for a {string} journey",
  { timeout: 4 * 50000 },
  async function (journeyType) {
    expect(this.sessionId).to.not.be.null;
    console.log("Session ID:" + this.sessionId);
    expect(this.authSessionState).to.equal("CIC_AUTH_CODE_ISSUED");
    expect(this.journey).to.equal(journeyType);
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
