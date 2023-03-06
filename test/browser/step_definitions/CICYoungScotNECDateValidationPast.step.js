const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { YoungScotNECDetailsPageInvalidPast, PhotoIdExpiryPage } = require("../pages");

  Given(/^the date entered is before the accepted Young Scot NEC expiration window$/, async function () {

    const youngScotNecDetails = new YoungScotNECDetailsPageInvalidPast(await this.page);
  
    await youngScotNecDetails.expiryDate();

  });


  When(/^the user clicks the continue button on the Young Scot NEC Past Page$/, async function () {

    const youngScotNecDetails = new YoungScotNECDetailsPageInvalidPast(await this.page);
  
    expect(await youngScotNecDetails.isCurrentPage()).to.be.true;

    await youngScotNecDetails.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the Young Scot NEC Screen$/, async function () {
        
      const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

      expect(await photoIdExpPg.isCurrentPage()).to.be.true;
  });
