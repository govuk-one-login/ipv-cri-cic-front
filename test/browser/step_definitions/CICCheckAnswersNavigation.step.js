const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  CheckDetailsPage,
  DateOfBirthPage,
  NameEntryPage,
} = require("../pages");

Given(
  /^the user has navigated to the Check My Answers page$/,
  async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  },
);

When(
  /^the Back link is clicked on the Check My Answers page$/,
  async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    await cdPage.back();
  },
);

Then(/^the user is navigated back to the DOB Entry page$/, async function () {
  const doBPage = new DateOfBirthPage(await this.page);

  expect(await doBPage.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
});

Given(/^the user has navigated to the DoB Entry page$/, async function () {
  const dobPage = new DateOfBirthPage(await this.page);

  expect(await dobPage.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
});

When(/^the Back link is clicked on the DoB Entry page$/, async function () {
  const dobPage = new DateOfBirthPage(await this.page);

  await dobPage.back();
});

Then(
  /^the user is navigated back to the screen that they came from - Name Entry$/,
  async function () {
    const nameEntry = new NameEntryPage(await this.page);

    expect(await nameEntry.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  },
);
