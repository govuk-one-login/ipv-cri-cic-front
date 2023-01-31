const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage, DateOfBirthPage }  = require("../pages");
       
Given(
  /^there has been an entry into the surname and first name fields$/,
  async function () {
    console.log(">>In nameEntryPage - enter name function");
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.enterSurname();
    await nameEntryPage.enterFirstName();
    await nameEntryPage.enterMiddleName();

  }
);

When(/^the user clicks the NameEntry continue button$/, async function () {
  console.log(">>In nameEntryPage - continue button function");

  const nameEntryPage = new NameEntryPage(await this.page);
  
  await nameEntryPage.continue();

});

// Then(
//   /^the content in the fields is successfully validated$/,
//   async function () {}
// );

Then(
  /^the user is routed to the next screen in the journey DOB Entry$/,
  async function () {
    console.log(">>In nameEntryPage - next screen function");

    const dobPage = new DateOfBirthPage(await this.page);

    expect(await dobPage.isCurrentPage()).to.be.true;
    
  }
);