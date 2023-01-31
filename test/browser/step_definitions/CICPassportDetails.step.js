const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PassportDetailsPage, NameEntryPage} = require("../pages");

  Given(/^the date entered is within accepted expiration window$/, async function () {
    console.log('>> In PPD page - fill out date fields');
    const passportDetailsPage = new PassportDetailsPage(await this.page);
  
    await passportDetailsPage.expiryDateDay();

    await passportDetailsPage.expiryDateMonth();

    await passportDetailsPage.expiryDateYear();

  });


  //When(/^it is in the correct format as described above$/, async function () {}
  //);


  When(/^the user clicks the continue button on the UKPassportPage$/, async function () {
    console.log(">>In PPID - UK passport option selected function");

    const passportDetailsPage = new PassportDetailsPage(await this.page);
  
   // expect(await passportDetailsPage.isCurrentPage()).to.be.true;

    await passportDetailsPage.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the journey Name Entry Screen$/, async function () {
        console.log(">>In passportDetailsPage - continue journey function");
    
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
