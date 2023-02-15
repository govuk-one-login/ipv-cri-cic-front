const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {EuDrivingLicenceDetailsPageInvalid, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is outside the accepted EU driving licence expiration window$/, async function () {

    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalid(await this.page);
  
    await euDrivingLicence.expiryDateDay();

    await euDrivingLicence.expiryDateMonth();

    await euDrivingLicence.expiryDateYear();

  });


  When(/^the user clicks the continue button on the EU driving licence page$/, async function () {

    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalid(await this.page);
  
    expect(await euDrivingLicence.isCurrentPage()).to.be.true;

    await euDrivingLicence.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the EU driving licence screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
