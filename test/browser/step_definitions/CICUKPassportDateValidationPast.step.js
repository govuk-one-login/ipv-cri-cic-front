const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PassportDetailsPagePast, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is more than 19 months in the past$/, async function () {

    const ukPassport = new PassportDetailsPagePast(await this.page);
  
    await ukPassport.expiryDateDay();

    await ukPassport.expiryDateMonth();

    await ukPassport.expiryDateYear();

  });


  When(/^the user clicks the continue button on the UK Passport Page$/, async function () {

    const ukPassport = new PassportDetailsPagePast(await this.page);
  
    expect(await ukPassport.isCurrentPage()).to.be.true;

    await ukPassport.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the UK Passport Screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });