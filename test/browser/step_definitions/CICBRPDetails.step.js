const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { BRPDetailsPage, NameEntryPage,} = require("../pages");

  Given(/^the date entered is within accepted BRP expiration window$/, async function () {
    console.log('>> In BRP page - fill out date fields');
    const brpDetailsPage = new BRPDetailsPage(await this.page);
  
    await brpDetailsPage.expiryDateDay();

    await brpDetailsPage.expiryDateMonth();

    await brpDetailsPage.expiryDateYear();

  });


  When(/^the user clicks the continue button on the BRP Page$/, async function () {
    console.log(">>In BRP Page continue option selected function");

    const brpDetailsPage = new BRPDetailsPage(await this.page);
  
    expect(await brpDetailsPage.isCurrentPage()).to.be.true;

    await brpDetailsPage.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the BRP journey - Name Entry$/, async function () {
        console.log(">>In BRP Page - continue journey function");
    
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
