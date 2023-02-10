const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, YoungScotNECDetailsPage } = require("../pages");

  Given(/^the Young Scot NEC option is selected$/, async function () { 
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.youngScotNecChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  When(/^the user clicks the PhotoId continue button with Young Scot NEC selected$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });
  
  Then(/^the user is routed to the next screen in the Young Scot NEC journey - Young Scot NEC details$/, async function () {
    const youngScotNECDetailsPage = new YoungScotNECDetailsPage(await this.page);

    expect(await youngScotNECDetailsPage.isCurrentPage()).to.be.true;

  });
  