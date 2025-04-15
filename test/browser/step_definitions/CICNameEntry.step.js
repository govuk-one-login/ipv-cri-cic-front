const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { injectAxe } = require("axe-playwright");

const axe = require('axe-core');

const {
  NameEntryPage,
  DateOfBirthPage,
  EuDrivingLicenceDetailsPageValid,
} = require("../pages");

const userData = require("../support/cicUserData.json");

Given(
  /^there has been an entry into the surname and first name fields$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.enterSurname(userData.lastName);
    await nameEntryPage.enterFirstName(userData.firstName);
    await nameEntryPage.enterMiddleName(userData.middleName);
  },
);

Given(
  /^the page should conform to WCAG 2.2 AA guidelines$/,
  async function () {
    await injectAxe(this.page);
    // Run Axe for WCAG 2.2 AA rules
    const wcagResults = await this.page.evaluate(() => {
      return axe.run({
        runOnly: ["wcag2aa"]
      });
    });
    expect(wcagResults.violations, "WCAG 2.2 AAA violations found").to.be.empty;
  },
);

When(/^the user clicks the GOV UK support Link$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  //setup promise to catch a 'open new tab' event
  const newTabPromise = this.page.waitForEvent("popup");
  await nameEntryPage.clickSupportLink();

  // after clicking the link a new tab should have opened
  // assign the caught event to the new tab variable to called elsewhere
  this.supportTab = await newTabPromise;
  await this.supportTab.waitForLoadState();
});

When(/^the user clicks the NameEntry continue button$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  await nameEntryPage.continue();
});

Then(/^the user clicks the character Details Link$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  await nameEntryPage.characterDetailsLink();
});

Then(
  /^they should be redirected to the GOV UK support page$/,
  async function () {
    expect(await this.supportTab.url()).to.contain(
      "https://home.account.gov.uk/contact-gov-uk-one-login",
    );
  },
);

Then(
  /^the user is routed to the next screen in the journey DOB Entry$/,
  async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    expect(await dobPage.isCurrentPage()).to.be.true;
  },
);

Then(
  /^the user is routed to the next screen in the journey No Photo Id DOB Entry$/,
  async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    expect(await dobPage.isCurrentPageNoPhotoID()).to.be.true;
  },
);

Then(
  /^the user is routed to the next screen in the journey Low Confidence DOB Entry$/,
  async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    expect(await dobPage.isCurrentPageLowConfidence()).to.be.true;
  },
);

Given(/^only one mandatory name field has been entered$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  await nameEntryPage.enterSurname();
  await nameEntryPage.enterMiddleName();
});

When(
  /^the user clicks the continue button in the NameEntry screen$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);
    await nameEntryPage.continue();
  },
);

Then(
  /^the user sees an inline error message displayed in the NameEntry screen$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    expect(await nameEntryPage.isCurrentPage()).to.be.true;

    const inlineError = "There is a problem";

    const error = await nameEntryPage.checkErrorText();

    expect(await error).to.equal(inlineError);
  },
);

Given(/^the user has navigated to the Name Entry screen$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  expect(await nameEntryPage.isCurrentPage()).to.be.true;
});

When(/^the Back link is clicked on the Name Entry screen$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  await nameEntryPage.back();
});

Then(
  /^the user is navigated back to the screen that they came from$/,
  async function () {
    const euDLDetailsPage = new EuDrivingLicenceDetailsPageValid(
      await this.page,
    );

    expect(await euDLDetailsPage.isCurrentPage()).to.be.true;
  },
);
