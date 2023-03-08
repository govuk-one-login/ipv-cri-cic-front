const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage, PhotoIdSelectionPageEdit, EuDrivingLicenceDetailsPageValidEdit }  = require("../pages");

Given(/^the user has navigated to Check My Answers page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});

When(/^the change ID link is clicked$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    await cdPage.changeIdType();

})

Then(/^the user is navigated back to the document selection page$/, async function () {
    const idSelection = new PhotoIdSelectionPageEdit(await this.page);

    expect(await idSelection.isCurrentPage()).to.be.true;

});

Then(/^a different ID type is selected$/, async function () {
    const photoIdPage = new PhotoIdSelectionPageEdit(await this.page);
    
    await photoIdPage.euDrivingLicenceChoice();

    expect(await photoIdPage.isCurrentPage()).to.be.true
});

Then(/^the user clicks continue with a different ID type selected$/, async function () {
    const photoIdPage = new PhotoIdSelectionPageEdit(await this.page);
  
    await photoIdPage.continue();
});

Then(/^the user navigates to ID expiry screen$/, async function () {
    const euDrivingLicence = new EuDrivingLicenceDetailsPageValidEdit(await this.page);

    expect(await euDrivingLicence.isCurrentPage()).to.be.true;

});

Then(/^the user enters a date within the expiry window$/, async function () {
    const euDrivingLicence = new EuDrivingLicenceDetailsPageValidEdit(await this.page);

    await euDrivingLicence.expiryDate();

});

Then(/^the user clicks continue$/, async function () {
    const euDrivingLicence = new EuDrivingLicenceDetailsPageValidEdit(await this.page);

    await euDrivingLicence.continue();

});

Then(/^the user is navigated back to the Check My Answers screen$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});
