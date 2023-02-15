const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, BRPDetailsPageValid, } = require("../pages");

  Given(/^the BRP option is selected$/, async function () {
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.brpChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  

  When(/^the user clicks the BRP continue button$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });
  
  Then(/^the user is routed to the next screen in the journey BRP Expiry Date$/, async function () {
     const brpDetailsPage = new BRPDetailsPageValid(await this.page);

     expect(await brpDetailsPage.isCurrentPage()).to.be.true;

   });

