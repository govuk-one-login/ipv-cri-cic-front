const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, BRPDetailsPage, } = require("../pages");

  Given(/^the BRP option is selected$/, async function () {
     console.log(">>In PhotoIdSelectionPage - BRP option selected function");
     
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.brpChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  

  When(/^the user clicks the BRP continue button$/, async function () {
    console.log(">>In photoIdPage - BRP option continue function");

    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });
  
  Then(/^the user is routed to the next screen in the journey BRP Expiry Date$/, async function () {
     console.log(">>In photoIdPage - BRP option continue journey function");
     const brpDetailsPage = new BRPDetailsPage(await this.page);

     expect(await brpDetailsPage.isCurrentPage()).to.be.true;

   });

