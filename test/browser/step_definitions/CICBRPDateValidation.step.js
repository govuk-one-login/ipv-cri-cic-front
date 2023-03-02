const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { BRPDetailsPageInvalid } = require("../pages");

  Given(/^the date entered is outside the accepted BRP expiration window$/, async function () {

    const brp = new BRPDetailsPageInvalid(await this.page);
  
    await brp.expiryDate();

  });


  When(/^the user clicks the continue button on the BRP page$/, async function () {

    const brp = new BRPDetailsPageInvalid(await this.page);
  
    expect(await brp.isCurrentPage()).to.be.true;

    await brp.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the BRP Page$/, async function () {
        
    const brp = new BRPDetailsPageInvalid(await this.page);

    expect(await brp.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await brp.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });
