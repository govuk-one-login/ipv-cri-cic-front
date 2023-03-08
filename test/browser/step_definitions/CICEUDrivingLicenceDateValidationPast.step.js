const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {EuDrivingLicenceDetailsPageInvalidPast, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is before the accepted EU driving licence expiration window$/, async function () {

    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalidPast(await this.page);
  
    await euDrivingLicence.expiryDate();

  });


  When(/^the user clicks the continue button on the EU Driving Licence Past page$/, async function () {

    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalidPast(await this.page);
  
    expect(await euDrivingLicence.isCurrentPage()).to.be.true;

    await euDrivingLicence.continue();
  
  });
  

  Then(/^the user is routed to the Expired Date Error Screen from the EU Driving Licence screen$/, async function () {
        
        const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

        expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });
