const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage, PhotoDlDetailsPageValid} = require("../pages");

  Given(/^the date entered is within accepted UKPhotoDL expiration window$/, async function () {
    console.log('>> In UK Photo DL Details step - fill out date fields');
    const ukPhotoDl = new PhotoDlDetailsPageValid(await this.page);
  
    await ukPhotoDl.expiryDateDay();

    await ukPhotoDl.expiryDateMonth();

    await ukPhotoDl.expiryDateYear();

  });


  When(/^the user clicks the continue button on the UKPhotoDL Page$/, async function () {
    console.log(">>In UK Photo DL Details step - UKPhotoDL continue button function");

    const ukPhotoDl = new PhotoDlDetailsPageValid(await this.page);
  
    expect(await ukPhotoDl.isCurrentPage()).to.be.true;

    await ukPhotoDl.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the UKPhotoDL journey - Name Entry$/, async function () {
        console.log(">>In UK Photo DL Details step - continue to next page function");
    
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
