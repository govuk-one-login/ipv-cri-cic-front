const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {NationalIdentityCardEEADetailsPageInvalidFuture} = require("../pages");

  Given(/^the date entered is beyond the accepted National Identity Card EEA expiration window$/, async function () {

    const nationalIdentityCardEEA = new NationalIdentityCardEEADetailsPageInvalidFuture(await this.page);
  
    await nationalIdentityCardEEA.expiryDate();

  });


  When(/^the user clicks the continue button on the National Identity Card EEA Future details Page$/, async function () {

    const nationalIdentityCardEEA = new NationalIdentityCardEEADetailsPageInvalidFuture(await this.page);
  
    expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;

    await nationalIdentityCardEEA.continue();
  
  });
  

  Then(/^the user sees an inline error on the National Identity Card EEA Screen$/, async function () {
        
      const niEEA = new NationalIdentityCardEEADetailsPageInvalidFuture(await this.page);

      expect(await niEEA.isCurrentPage()).to.be.true;

      const inlineError = 'There is a problem';
      const error = await niEEA.checkErrorText();
        
      expect(await error).to.equal(inlineError);
  
  });
