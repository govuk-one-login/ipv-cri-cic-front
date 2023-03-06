const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

<<<<<<< HEAD:test/browser/step_definitions/CICCitizenCardDateValidationPast.step.js
const {CitizenCardDetailsPageInvalidPast, PhotoIdExpiryPage} = require("../pages");
=======
const { CitizenCardDetailsPageInvalid } = require("../pages");
>>>>>>> main:test/browser/step_definitions/CICCitizenCardDateValidation.step.js

  Given(/^the date entered is before the accepted CitizenCard expiration window$/, async function () {

    const citizenCardDetails = new CitizenCardDetailsPageInvalidPast(await this.page);
  
    await citizenCardDetails.expiryDate();

  });


  When(/^the user clicks the continue button on the CitizenCard Past details Page$/, async function () {

    const citizenCardDetails = new CitizenCardDetailsPageInvalidPast(await this.page);
  
    expect(await citizenCardDetails.isCurrentPage()).to.be.true;

    await citizenCardDetails.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the CitizenCard Page$/, async function () {
        
    const citizenCard = new CitizenCardDetailsPageInvalid(await this.page);

    expect(await citizenCard.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await citizenCard.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });
