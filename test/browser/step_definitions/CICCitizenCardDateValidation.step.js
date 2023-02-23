const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {CitizenCardDetailsPageInvalid, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is outside the accepted CitizenCard expiration window$/, async function () {

    const citizenCardDetails = new CitizenCardDetailsPageInvalid(await this.page);
  
    await citizenCardDetails.expiryDate();

  });


  When(/^the user clicks the continue button on the CitizenCard details Page$/, async function () {

    const citizenCardDetails = new CitizenCardDetailsPageInvalid(await this.page);
  
    expect(await citizenCardDetails.isCurrentPage()).to.be.true;

    await citizenCardDetails.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the CitizenCard Screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
