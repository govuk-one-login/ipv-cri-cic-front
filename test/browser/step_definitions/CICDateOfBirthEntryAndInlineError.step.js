const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { DateOfBirthPage, CheckDetailsPage } = require("../pages");

const userData = require("../support/cicUserData.json");

Given(/^the DOB fields are populated with valid values$/, async function () {
  const dobPage = new DateOfBirthPage(await this.page);

  await dobPage.dateOfBirth(userData);
});

When(/^the user clicks the DoB continue button$/, async function () {
  const dobPage = new DateOfBirthPage(await this.page);

  await dobPage.continue();
});

Then(/^they are routed to the Check My Answers Screen$/, async function () {
  const cdPage = new CheckDetailsPage(await this.page);

  expect(await cdPage.isCurrentPage()).to.be.true;
});

Then(
  /^they are routed to the No Photo ID Check My Answers Screen$/,
  async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPageNoPhotoID()).to.be.true;
  },
);

Then(
  /^they are routed to the Low Confidence Check My Answers Screen$/,
  async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPageLowConfidence()).to.be.true;
  },
);

Given(
  /^the user clicks the continue button only on the DoBEntryPage$/,
  async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    await dobPage.continue();
  },
);

Then(
  /^the user sees an inline error message displayed on the DoBEntryPage$/,
  async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    expect(await dobPage.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";

    const error = await dobPage.checkErrorText();

    expect(await error).to.equal(inlineError);
  },
);
