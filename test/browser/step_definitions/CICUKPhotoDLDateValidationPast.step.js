const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoDlDetailsPageInvalidPast, PhotoIdExpiryPage } = require("../pages");

  Given(/^the date entered is before the accepted UKPhotoDLExpiry expiration window$/, async function () {

    const ukPhotoDl = new PhotoDlDetailsPageInvalidPast(await this.page);
  
    await ukPhotoDl.expiryDate();

  });


  When(/^the user clicks the continue button on the UKPhotoDLExpiryPast Page$/, async function () {

    const ukPhotoDl = new PhotoDlDetailsPageInvalidPast(await this.page);
  
    expect(await ukPhotoDl.isCurrentPage()).to.be.true;

    await ukPhotoDl.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the UK DL screen$/, async function () {
        
      const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

      expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
