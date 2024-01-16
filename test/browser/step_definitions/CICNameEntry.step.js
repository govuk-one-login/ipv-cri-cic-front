const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage, DateOfBirthPage, EuDrivingLicenceDetailsPageValid } = require("../pages");

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
  /^there has been an invalid entry into the surname and first name fields$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    // Names must be more than 1 character long - making these names invalid
    await nameEntryPage.enterSurname("A");
    await nameEntryPage.enterFirstName("B");
    await nameEntryPage.enterMiddleName("C");

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

Given(/^only one mandatory name field has been entered$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  await nameEntryPage.enterSurname("Hartley");
  await nameEntryPage.enterMiddleName("Robert");

}
);

When(
  /^the user clicks the continue button in the NameEntry screen$/, async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.continue();

  });

Then(
  /^the user sees an inline error message displayed in the NameEntry screen$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    expect(await nameEntryPage.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await nameEntryPage.checkErrorText();

    expect(await error).to.equal(inlineError);

  }
);

Given(/^the user has navigated to the Name Entry screen$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  expect(await nameEntryPage.isCurrentPage()).to.be.true;

}
);

When(/^the Back link is clicked on the Name Entry screen$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  await nameEntryPage.back();

});

Then(/^the user is navigated back to the screen that they came from$/, async function () {
  const euDLDetailsPage = new EuDrivingLicenceDetailsPageValid(await this.page);

  expect(await euDLDetailsPage.isCurrentPage()).to.be.true;

});

Then(/^the user is shown an error message for invalid names$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  
  expect(await nameEntryPage.checkErrorText()).to.contain("There is a problem");
  expect(await nameEntryPage.getInvalidFirstNameErrorText()).to.contain("Your first name must be more than one character");
  expect(await nameEntryPage.getInvalidMiddleNameErrorText()).to.contain("Your middle name must be more than one character");
  expect(await nameEntryPage.getInvalidLastNameErrorText()).to.contain("Your last name must be more than one character");
});