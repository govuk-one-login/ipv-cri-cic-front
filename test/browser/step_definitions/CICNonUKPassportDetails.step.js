const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NonUKPassportDetailsPage, NameEntryPage} = require("../pages");

  Given(/^the date entered is within accepted Non UK expiration window$/, async function () {
    console.log('>> In Non UK PPD page - fill out date fields');
    const nonUKPassportDetails = new NonUKPassportDetailsPage(await this.page);
  
    await nonUKPassportDetails.expiryDateDay();

    await nonUKPassportDetails.expiryDateMonth();

    await nonUKPassportDetails.expiryDateYear();

  });


  When(/^the user clicks the continue button on the NonUKPassportPage$/, async function () {
    console.log(">>In Non UK PPID - Non UK passport option selected function");

    const nonUKPassportDetails = new NonUKPassportDetailsPage(await this.page);
  
    expect(await nonUKPassportDetails.isCurrentPage()).to.be.true;

    await nonUKPassportDetails.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the NonUKPassport journey - Name Entry$/, async function () {
        console.log(">>In Non UK passportDetailsPage - continue journey function");
    
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
