const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");


const { PhotoIdSelectionPage, PassportDetailsPageValid } = require("../pages");

  Given(/^the UK passport option is selected$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
    
    await photoIdPage.ukPassportChoice();

    expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  When(/^the user clicks the PhotoId continue button$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });
  
  Then(/^the user is routed to the next screen in the journey Passport Details$/, async function () {
    const passportDetailsPage = new PassportDetailsPageValid(await this.page);

    expect(await passportDetailsPage.isCurrentPage()).to.be.true;

  });
