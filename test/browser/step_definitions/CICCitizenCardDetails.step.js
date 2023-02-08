const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CitizenCardDetailsPage, NameEntryPage} = require("../pages");

  Given(/^the date entered is within accepted CitizenCard expiration window$/, async function () {
    console.log('>> In CitizenCard details page - fill out date fields');
    const citizenCardDetails = new CitizenCardDetailsPage(await this.page);
  
    await citizenCardDetails.expiryDateDay();

    await citizenCardDetails.expiryDateMonth();

    await citizenCardDetails.expiryDateYear();

  });

  
  When(/^the user clicks the continue button on the CitizenCard details page$/, async function () {
    console.log(">>In CitizenCard details page - CitizenCard option selected function");

    const citizenCardDetails = new CitizenCardDetailsPage(await this.page);
  
    expect(await citizenCardDetails.isCurrentPage()).to.be.true;

    await citizenCardDetails.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the CitizenCard journey - Name Entry$/, async function () {
        console.log(">>In citizenCardDetailsPage - continue journey function");
    
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
