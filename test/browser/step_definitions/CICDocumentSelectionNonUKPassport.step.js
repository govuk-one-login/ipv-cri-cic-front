const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, NonUKPassportDetailsPage, } = require("../pages");

  Given(/^the Other passport option is selected$/, async function () {
     console.log(">>In PhotoIdSelectionPage - UK passport option selected function");
     
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.nonUKPassportChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  

  When(/^the user clicks the continue button$/, async function () {
    console.log(">>In photoIdPage - UK passport option continue function");

    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });
  
  Then(/^the user is routed to the next screen in the journey Other Passport Details$/, async function () {
     console.log(">>In photoIdPage - NonUK passport option continue journey function");
    const nonUKPassportDetails = new NonUKPassportDetailsPage(await this.page);

     expect(await nonUKPassportDetails.isCurrentPage()).to.be.true;

   });
