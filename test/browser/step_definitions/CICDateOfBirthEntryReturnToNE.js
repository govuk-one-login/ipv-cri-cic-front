const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { DateOfBirthPage, NameEntryPage }  = require("../pages");
       

Given(/^the user has navigated to the DoB Entry page$/, async function () {
   const dobPage = new DateOfBirthPage(await this.page);
  
   expect(await dobPage.isCurrentPage()).to.be.true;

});


  When(/^the Back link is clicked on the DoB Entry page$/, async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    await dobPage.back();

  });


  Then(/^the user is navigated back to the previous page - NI Card EEA Details$/, async function () {
    const nameEntry = new NameEntryPage(await this.page);

    expect(await nameEntry.isCurrentPage()).to.be.true;
  });
