const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { BRPDetailsPageInvalidPast, PhotoIdExpiryPage } = require("../pages");

  Given(/^the date entered is before the accepted BRP expiration window$/, async function () {

    const brp = new BRPDetailsPageInvalidPast(await this.page);
  
    await brp.expiryDate();

  });


  When(/^the user clicks the continue button on the BRPPast page$/, async function () {

    const brp = new BRPDetailsPageInvalidPast(await this.page);
  
    expect(await brp.isCurrentPage()).to.be.true;

    await brp.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the BRP Page$/, async function () {
        
      const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

      expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
