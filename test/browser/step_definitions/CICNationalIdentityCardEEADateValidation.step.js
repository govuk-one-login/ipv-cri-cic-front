const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NationalIdentityCardEEADetailsPageInvalid } = require("../pages");

  Given(/^the date entered is outside the accepted National Identity Card EEA expiration window$/, async function () {

    const nationalIdentityCardEEA = new NationalIdentityCardEEADetailsPageInvalid(await this.page);
  
    await nationalIdentityCardEEA.expiryDate();

  });


  When(/^the user clicks the continue button on the National Identity Card EEA details Page$/, async function () {

    const nationalIdentityCardEEA = new NationalIdentityCardEEADetailsPageInvalid(await this.page);
  
    expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;

    await nationalIdentityCardEEA.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the EEA ID Page$/, async function () {
        
    const eeaID = new NationalIdentityCardEEADetailsPageInvalid(await this.page);

    expect(await eeaID.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await eeaID.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });
