const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { BRPDetailsPageValid, NameEntryPage,} = require("../pages");

  Given(/^the date entered is within accepted BRP expiration window$/, async function () {
    const brpDetailsPage = new BRPDetailsPageValid(await this.page);
  
    await brpDetailsPage.expiryDate();

  });


  When(/^the user clicks the continue button on the BRP Page$/, async function () {
    const brpDetailsPage = new BRPDetailsPageValid(await this.page);
  
    expect(await brpDetailsPage.isCurrentPage()).to.be.true;

    await brpDetailsPage.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the BRP journey - Name Entry$/, async function () {    
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
