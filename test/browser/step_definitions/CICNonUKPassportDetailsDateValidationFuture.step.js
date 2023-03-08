const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NonUKPassportDetailsPageInvalidFuture } = require("../pages");

  Given(/^the date entered is beyond the accepted Non UK Passport expiration window$/, async function () {

    const NonUKPassport = new NonUKPassportDetailsPageInvalidFuture(await this.page);
  
    await NonUKPassport.expiryDate();

  });


  When(/^the user clicks the continue button on the Non UK Passport Future page$/, async function () {

    const NonUKPassport = new NonUKPassportDetailsPageInvalidFuture(await this.page);
  
    expect(await NonUKPassport.isCurrentPage()).to.be.true;

    await NonUKPassport.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the Non UK Passport Page$/, async function () {
        
    const nonUKPassport = new NonUKPassportDetailsPageInvalidFuture(await this.page);

    expect(await nonUKPassport.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await nonUKPassport.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });
