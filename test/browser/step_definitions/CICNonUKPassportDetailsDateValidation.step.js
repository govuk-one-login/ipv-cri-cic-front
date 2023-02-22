const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {NonUKPassportDetailsPageInvalid, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is outside the accepted Non UK Passport expiration window$/, async function () {

    const NonUKPassport = new NonUKPassportDetailsPageInvalid(await this.page);
  
    await NonUKPassport.expiryDate();

  });


  When(/^the user clicks the continue button on the Non UK Passport page$/, async function () {

    const NonUKPassport = new NonUKPassportDetailsPageInvalid(await this.page);
  
    expect(await NonUKPassport.isCurrentPage()).to.be.true;

    await NonUKPassport.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the Non UK Passport screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
