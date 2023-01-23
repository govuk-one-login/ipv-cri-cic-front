const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PassportDetailsPage} = require("../pages");

  Given(/^the date entered is within accepted expiration window$/, async function () {
    console.log('>> In PPD page - fill out date fields');
    const passportDetailsPage = new PassportDetailsPage(this.page);
  
    await passportDetailsPage.expiryDateDay();

    await passportDetailsPage.expiryDateMonth();

    await passportDetailsPage.expiryDateYear();

  });


  Given('it is in the correct format as described above', async function () {}
  );


  When(/^the user clicks the continue button$/, async function () {
    console.log(">>In PPID - UK passport option selected function");

    const passportDetailsPage = new PassportDetailsPage(this.page);
  
    expect(passportDetailsPage.isCurrentPage()).to.be.true;

    await passportDetailsPage.continue();
  
  });
  

  // Then('the user is routed to the next screen in the journey: Name Entry Screen', function () {
  //       console.log(">>In passportDetailsPage - continue journey function");
    
  //       const nameEntryPage = new NameEntryPage();

  //       expect(nameEntryPage.isCurrentPage()).to.be.true;

  // });
