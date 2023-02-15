const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {YoungScotNECDetailsPageInvalid, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is outside the accepted Young Scot NEC expiration window$/, async function () {

    const youngScotNecDetails = new YoungScotNECDetailsPageInvalid(await this.page);
  
    await youngScotNecDetails.expiryDateDay();

    await youngScotNecDetails.expiryDateMonth();

    await youngScotNecDetails.expiryDateYear();

  });


  When(/^the user clicks the continue button on the Young Scot NEC details Page$/, async function () {

    const youngScotNecDetails = new YoungScotNECDetailsPageInvalid(await this.page);
  
    expect(await youngScotNecDetails.isCurrentPage()).to.be.true;

    await youngScotNecDetails.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the Young Scot NEC Screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
