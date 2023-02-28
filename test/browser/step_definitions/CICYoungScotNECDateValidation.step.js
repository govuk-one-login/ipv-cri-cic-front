const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { YoungScotNECDetailsPageInvalid } = require("../pages");

  Given(/^the date entered is outside the accepted Young Scot NEC expiration window$/, async function () {

    const youngScotNecDetails = new YoungScotNECDetailsPageInvalid(await this.page);
  
    await youngScotNecDetails.expiryDate();

  });


  When(/^the user clicks the continue button on the Young Scot NEC details Page$/, async function () {

    const youngScotNecDetails = new YoungScotNECDetailsPageInvalid(await this.page);
  
    expect(await youngScotNecDetails.isCurrentPage()).to.be.true;

    await youngScotNecDetails.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the Young Scot NEC Screen$/, async function () {
        
    const ysNEC = new YoungScotNECDetailsPageInvalid(await this.page);

    expect(await ysNEC.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await ysNEC.checkErrorText();
      
    expect(await error).to.equal(inlineError);
  });
