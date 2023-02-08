const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

const {PhotoIdSelectionPage, NationalIdentityCardEEADetailsPage } = require("../pages");

  Given(/^the National Identity Card EEA option is selected$/, async function () {     
     const photoIdPage = new PhotoIdSelectionPage(await this.page);

     await photoIdPage.nationalIdentityCardEEAChoice();
	
  });

  When(/^the user clicks the continue button with National Identity Card EEA selected$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    await photoIdPage.continue();

  });

  Then(/^the user is routed to the next screen in the National Identity Card EEA journey - National Identity Card EEA details$/, async function () {
    const nationalIdentityCardEEADetailsPage = new NationalIdentityCardEEADetailsPage(await this.page);

    expect(await nationalIdentityCardEEADetailsPage.isCurrentPage()).to.be.true;

  });