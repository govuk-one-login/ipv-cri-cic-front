const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, EuDrivingLicenceDetailsPage } = require("../pages");

  Given(/^the EU driving licence option is selected$/, async function () {
     console.log(">>In PhotoIdSelectionPage - EU Driving Licence option selected function");
     
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.euDrivingLicenceChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  When(/^the user clicks the EU driving licence button$/, async function () {
    console.log(">>In photoIdPage - EU Driving Licence option continue function");

    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });
  
  Then(/^the user is routed to the EU DL Expiry Entry Screen$/, async function () {
    console.log(">>In photoIdPage - EU Driving Licence option continue journey function");

    const euDrivingLicenceDetailsPage = new EuDrivingLicenceDetailsPage(await this.page);

    expect(await euDrivingLicenceDetailsPage.isCurrentPage()).to.be.true;

  });
  