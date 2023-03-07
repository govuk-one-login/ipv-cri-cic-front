const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NonUKPassportDetailsPageInvalidPast, PhotoIdExpiryPage } = require("../pages");

  Given(/^the date entered is before the accepted Non UK Passport expiration window$/, async function () {

    const NonUKPassport = new NonUKPassportDetailsPageInvalidPast(await this.page);
  
    await NonUKPassport.expiryDate();

  });


  When(/^the user clicks the continue button on the Non UK Passport Past page$/, async function () {

    const NonUKPassport = new NonUKPassportDetailsPageInvalidPast(await this.page);
  
    expect(await NonUKPassport.isCurrentPage()).to.be.true;

    await NonUKPassport.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the Non UK passport screen$/, async function () {
        
      const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

      expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
