const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage } = require("../pages");

Given(/^the user has completed the previous CIC screens$/, async function () {
  const cpdPage = new CheckDetailsPage(await this.page);
  expect(await cpdPage.isCurrentPage()).to.be.true;
});

Given(
  /^the user has completed the previous CIC No Photo ID screens$/,
  async function () {
    const cpdPage = new CheckDetailsPage(await this.page);
    expect(await cpdPage.isCurrentPageNoPhotoID()).to.be.true;
  },
);

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
