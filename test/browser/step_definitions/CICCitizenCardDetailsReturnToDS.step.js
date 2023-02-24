const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CitizenCardDetailsPageValid, PhotoIdSelectionPage} = require("../pages");

  Given(/^the user has navigated to the Citizen Card Expiry page$/, async function () {
    const citizenCardDetails = new CitizenCardDetailsPageValid(await this.page);
   
    expect(await citizenCardDetails.isCurrentPage()).to.be.true;

  });

  
  When(/^the Back link is clicked on the Citizen Card Expiry page$/, async function () {
    const citizenCardDetails = new CitizenCardDetailsPageValid(await this.page);

    await citizenCardDetails.back();
  });
  

  Then(/^the user is navigated back to the Document Selection page$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

     expect(await photoIdPage.isCurrentPage()).to.be.true

  });
