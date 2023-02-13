const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PassportDetailsPageFuture, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is more than 10 years in the future$/, async function () {

    const ukPassport = new PassportDetailsPageFuture(await this.page);
  
    await ukPassport.expiryDateDay();

    await ukPassport.expiryDateMonth();

    await ukPassport.expiryDateYear();

  });


  When(/^the user clicks the continue button on the UK Passport page$/, async function () {

    const ukPassport = new PassportDetailsPageFuture(await this.page);
  
    expect(await ukPassport.isCurrentPage()).to.be.true;

    await ukPassport.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the UK Passport screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });