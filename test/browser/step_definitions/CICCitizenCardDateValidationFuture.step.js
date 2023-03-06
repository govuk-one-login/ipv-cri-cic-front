const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {CitizenCardDetailsPageInvalidFuture} = require("../pages");

  Given(/^the date entered is beyond the accepted CitizenCard expiration window$/, async function () {

    const citizenCardDetails = new CitizenCardDetailsPageInvalidFuture(await this.page);
  
    await citizenCardDetails.expiryDate();

  });


  When(/^the user clicks the continue button on the CitizenCard Future details Page$/, async function () {

    const citizenCardDetails = new CitizenCardDetailsPageInvalidFuture(await this.page);
  
    expect(await citizenCardDetails.isCurrentPage()).to.be.true;

    await citizenCardDetails.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the CitizenCard Page$/, async function () {
        
      const citizenCardDetails = new CitizenCardDetailsPageInvalidFuture(await this.page);

      expect(await citizenCardDetails.isCurrentPage()).to.be.true;

      const inlineError = 'There is a problem';

      const error = await citizenCardDetails.checkErrorText();

      expect(await error).to.equal(inlineError);

  });
