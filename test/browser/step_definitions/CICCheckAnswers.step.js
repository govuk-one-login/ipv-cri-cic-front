const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage } = require("../pages");

const DynoDBConnection = require("../support/DynmoDBConnection")


Given(/^the user has completed the previous CIC screens$/, async function () {
  const cpdPage = new CheckDetailsPage(await this.page);

  expect(await cpdPage.isCurrentPage()).to.be.true;

});

When(/^the user clicks the Check My Answers Submit button$/, async function () {
  const cmPage = new CheckDetailsPage(await this.page);

  await cmPage.continue();
  this.state = await cmPage.setSessionState();
})


Given(/^I have retrieved the sessionTable data for my CIC session$/, { timeout: 2 * 50000 }, async function () {
  await new Promise(r => setTimeout(r, 10000));
  const sessionState = this.state;
  const dbConnection = new DynoDBConnection(sessionState.replace(/"/g, ""), "session-cic-cri-ddb");
  this.sessionId = await dbConnection.getCicSessionId();
  this.authSessionState = await dbConnection.getCicSessionAuthSessionState();
})


Then(/^session details are correctly stored in DB$/, { timeout: 2 * 50000 }, async function () {
  expect(this.sessionId).to.not.be.null;
  expect(this.authSessionState).to.equal("CIC_AUTH_CODE_ISSUED");
})

