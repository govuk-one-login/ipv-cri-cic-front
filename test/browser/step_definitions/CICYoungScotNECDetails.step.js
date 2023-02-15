const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { YoungScotNECDetailsPageValid, NameEntryPage} = require("../pages");

  Given(/^the date entered is within accepted Young Scot NEC expiration window$/, async function () {
    const youngScotNECDetailsPage = new YoungScotNECDetailsPageValid(await this.page);
  
    await youngScotNECDetailsPage.expiryDateDay();

    await youngScotNECDetailsPage.expiryDateMonth();

    await youngScotNECDetailsPage.expiryDateYear();

  });

  When(/^the user clicks the continue button on the Young Scot NEC Page$/, async function () {
    const youngScotNECDetailsPage = new YoungScotNECDetailsPageValid(await this.page);

    await youngScotNECDetailsPage.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the Young Scot NEC journey Name Entry Screen$/, async function () {
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
