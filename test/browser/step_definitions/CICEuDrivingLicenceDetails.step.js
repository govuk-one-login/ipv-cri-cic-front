const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { EuDrivingLicenceDetailsPage, NameEntryPage } = require("../pages");

  Given(/^the EU Driving Licence date entered is within accepted expiration window$/, async function () {
    console.log('>> In EU DL details page - fill out date fields');
    const euDrivingLicenceDetailsPage = new EuDrivingLicenceDetailsPage(await this.page);
  
    await euDrivingLicenceDetailsPage.expiryDateDay();

    await euDrivingLicenceDetailsPage.expiryDateMonth();

    await euDrivingLicenceDetailsPage.expiryDateYear();

  });


  //When(/^it is in the correct format as described above$/, async function () {}
  //);


  When(/^the user clicks the continue button on the EU Driving Licence details page$/, async function () {
    console.log(">>In EU DL details - EU DL option selected function");

    const euDrivingLicenceChoice = new EuDrivingLicenceDetailsPage(await this.page);
  
   // expect(await passportDetailsPage.isCurrentPage()).to.be.true;

    await euDrivingLicenceChoice.continue();
  
  });
  

  Then(/^the user is routed from EU DL Details to Name Entry Screen$/, async function () {
        console.log(">>In name entry - continue journey function");
    
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });