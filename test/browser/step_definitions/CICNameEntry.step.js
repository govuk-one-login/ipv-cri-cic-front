const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage, DateOfBirthPage }  = require("../pages");

const userData = require("../support/cicUserData.json")


Given(
  /^there has been an entry into the surname and first name fields$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.enterSurname(userData.lastName);
    await nameEntryPage.enterFirstName(userData.firstName);
    await nameEntryPage.enterMiddleName(userData.middleName);

  }
);

Given(
  /^there has been an entry containing a space into the surname and first name fields$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.enterSurname("Da Silva");
    await nameEntryPage.enterFirstName(userData.firstName);
    await nameEntryPage.enterMiddleName(userData.middleName);

  }
);

Given(
  /^there has been an entry containing a hyphen into the surname and first name fields$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.enterSurname(userData.lastName);
    await nameEntryPage.enterFirstName("Billy-Bob");
    await nameEntryPage.enterMiddleName(userData.middleName);

  }
);

Given(
  /^there has been an entry containing a dot into the surname and first name fields$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.enterSurname("Walker.Peters");
    await nameEntryPage.enterFirstName(userData.firstName);
    await nameEntryPage.enterMiddleName(userData.middleName);

  }
);

When(/^the user clicks the NameEntry continue button$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  await nameEntryPage.continue();

});

Then(
  /^the user is routed to the next screen in the journey DOB Entry$/,
  async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    expect(await dobPage.isCurrentPage()).to.be.true;

  }
);
