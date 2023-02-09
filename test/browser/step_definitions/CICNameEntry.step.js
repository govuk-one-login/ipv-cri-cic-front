const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage, DateOfBirthPage }  = require("../pages");
       
Given(
  /^there has been an entry into the surname and first name fields$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.enterSurname();
    await nameEntryPage.enterFirstName();
    await nameEntryPage.enterMiddleName();

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
