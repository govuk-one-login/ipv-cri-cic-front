const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PassportDetailsPageInvalidPast, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is more than 18 months in the past$/, async function () {

    const ukPassport = new PassportDetailsPageInvalidPast(await this.page);
  
    await ukPassport.expiryDate()

  });


  When(/^the user clicks the continue button on the UK passport page$/, async function () {

    const ukPassport = new PassportDetailsPageInvalidPast(await this.page);
  
    expect(await ukPassport.isCurrentPage()).to.be.true;

    await ukPassport.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the UK passport screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });