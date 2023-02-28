const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CitizenCardDetailsPageInvalid } = require("../pages");

  Given(/^the date entered is outside the accepted CitizenCard expiration window$/, async function () {

    const citizenCardDetails = new CitizenCardDetailsPageInvalid(await this.page);
  
    await citizenCardDetails.expiryDate();

  });


  When(/^the user clicks the continue button on the CitizenCard details Page$/, async function () {

    const citizenCardDetails = new CitizenCardDetailsPageInvalid(await this.page);
  
    expect(await citizenCardDetails.isCurrentPage()).to.be.true;

    await citizenCardDetails.continue();
  
  });
  

  Then(/^Then the user sees an inline error message displayed on the CitizenCard Page$/, async function () {
        
    const citizenCard = new CitizenCardDetailsPageInvalid(await this.page);

    expect(await citizenCard.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await citizenCard.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });
