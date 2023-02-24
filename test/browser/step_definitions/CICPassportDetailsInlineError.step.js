const { Given, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PassportDetailsPageValid} = require("../pages");


  Given(/^the user clicks the continue button only on the UKPassportPage$/, async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);
  
    expect(await passportDetailsPage.isCurrentPage()).to.be.true;

    await passportDetailsPage.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed$/, async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);
   
    expect (await passportDetailsPage.isCurrentPage()).to.be.true;
     
    const inlineError = 'There is a problem';

    const error = await passportDetailsPage.checkErrorText();
      
    expect(await error).to.equal(inlineError);
       
  });
