const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PassportDetailsPageInvalidFuture } = require("../pages");

  Given(/^the date entered is more than 10 years from today$/, async function () {

    const ukPassport = new PassportDetailsPageInvalidFuture(await this.page);
  
    await ukPassport.expiryDateDay();

  });


  When(/^the user clicks the continue button on the UK Passport page$/, async function () {

    const ukPassport = new PassportDetailsPageInvalidFuture(await this.page);
  
    expect(await ukPassport.isCurrentPage()).to.be.true;

    await ukPassport.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the UK Passport Page$/, async function () {
        
    const ukPassport = new PassportDetailsPageInvalidFuture(await this.page);

    expect(await ukPassport.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await ukPassport.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });