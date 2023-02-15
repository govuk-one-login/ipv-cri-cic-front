const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {NationalIdentityCardEEADetailsPageInvalid, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is outside the accepted National Identity Card EEA expiration window$/, async function () {

    const nationalIdentityCardEEA = new NationalIdentityCardEEADetailsPageInvalid(await this.page);
  
    await nationalIdentityCardEEA.expiryDateDay();

    await nationalIdentityCardEEA.expiryDateMonth();

    await nationalIdentityCardEEA.expiryDateYear();

  });


  When(/^the user clicks the continue button on the National Identity Card EEA details Page$/, async function () {

    const nationalIdentityCardEEA = new NationalIdentityCardEEADetailsPageInvalid(await this.page);
  
    expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;

    await nationalIdentityCardEEA.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the National Identity Card EEA Screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
