const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, PhotoDlDetailsPageValid, } = require("../pages");

  Given(/^the UK photocard driving licence option is selected$/, async function () {
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.drivingLicenceChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  

  When(/^the user clicks the UK DL continue button$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });
  
  Then(/^the user is routed to the next screen in the journey UKPhotoDL Expiry Date$/, async function () {
    const photoDLPage = new PhotoDlDetailsPageValid(await this.page);

     expect(await photoDLPage.isCurrentPage()).to.be.true;

   });

