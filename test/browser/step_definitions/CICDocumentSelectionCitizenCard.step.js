const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, CitizenCardDetailsPage } = require("../pages");

  Given(/^the CitizenCard option is selected$/, async function () { 
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.citizenCardChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  

  When(/^the user clicks the continue button with CitizenCard selected$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });
  
  
  Then(/^the user is routed to the next screen in the CitizenCard journey - CitizenCard details$/, async function () {
    const citizenCardDetails = new CitizenCardDetailsPage(await this.page);

     expect(await citizenCardDetails.isCurrentPage()).to.be.true;

   });