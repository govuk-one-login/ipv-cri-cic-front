const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage, PhotoDlDetailsPageValid} = require("../pages");

  Given(/^the date entered is within accepted UKPhotoDL expiration window$/, async function () {
    const ukPhotoDl = new PhotoDlDetailsPageValid(await this.page);
  
    await ukPhotoDl.expiryDate();

  });


  When(/^the user clicks the continue button on the UKPhotoDL Page$/, async function () {
    const ukPhotoDl = new PhotoDlDetailsPageValid(await this.page);
  
    expect(await ukPhotoDl.isCurrentPage()).to.be.true;

    await ukPhotoDl.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the UKPhotoDL journey - Name Entry$/, async function () {
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });
