const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage, EuDrivingLicenceDetailsPageValid }  = require("../pages");
       
Given(/^the user has navigated to the Name Entry screen$/, async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    expect(await nameEntryPage.isCurrentPage()).to.be.true;

  }
);

When(/^the Back link is clicked on the Name Entry screen$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  
  await nameEntryPage.back();

});

Then(/^the user is navigated back to the screen that they came from$/,async function () {
  const euDLDetailsPage = new EuDrivingLicenceDetailsPageValid(await this.page);

  expect(await euDLDetailsPage.isCurrentPage()).to.be.true;
    
  }
);
