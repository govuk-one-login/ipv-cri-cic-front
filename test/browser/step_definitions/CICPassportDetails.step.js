const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PassportDetailsPageValid, NameEntryPage} = require("../pages");

  Given(/^the date entered is within accepted UK Passport expiration window$/, async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);
  
    await passportDetailsPage.expiryDate();

  });


  When(/^the user clicks the continue button on the UKPassportPage$/, async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);
  
    expect(await passportDetailsPage.isCurrentPage()).to.be.true;

    await passportDetailsPage.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the journey Name Entry Screen$/, async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
