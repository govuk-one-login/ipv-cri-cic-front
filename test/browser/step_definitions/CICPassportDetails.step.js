const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PassportDetailsPage, NameEntryPage} = require("../pages");

  Given(/^the date entered is within accepted expiration window$/, async function () {
    const passportDetailsPage = new PassportDetailsPage(await this.page);
  
    await passportDetailsPage.expiryDateDay();

    await passportDetailsPage.expiryDateMonth();

    await passportDetailsPage.expiryDateYear();

  });


  When(/^the user clicks the continue button on the UKPassportPage$/, async function () {
    const passportDetailsPage = new PassportDetailsPage(await this.page);

    await passportDetailsPage.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the journey Name Entry Screen$/, async function () {
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
