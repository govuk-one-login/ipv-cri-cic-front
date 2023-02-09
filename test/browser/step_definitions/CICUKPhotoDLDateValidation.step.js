const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoDlDetailsPage, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is outside the accepted UKPhotoDLExpiry expiration window$/, async function () {

    const ukPhotoDl = new PhotoDlDetailsPage(await this.page);
  
    await ukPhotoDl.expiryDateDay();

    await ukPhotoDl.expiryDateMonth();

    await ukPhotoDl.expiryDateYear();

  });


  When(/^the user clicks the continue button on the UKPhotoDLExpiry Page$/, async function () {

    const ukPhotoDl = new PhotoDlDetailsPage(await this.page);
  
    expect(await ukPhotoDl.isCurrentPage()).to.be.true;

    await ukPhotoDl.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
