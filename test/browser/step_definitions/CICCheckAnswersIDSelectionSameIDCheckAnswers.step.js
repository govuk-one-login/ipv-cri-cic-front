const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage, PhotoIdSelectionPageEdit }  = require("../pages");

Given(/^the user has navigated to Check My Answers Page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});

When(/^the change ID link is selected$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    await cdPage.changeIdType();

})

Then(/^the user is navigated back to the ID selection page$/, async function () {
    const idSelection = new PhotoIdSelectionPageEdit(await this.page);

    expect(await idSelection.isCurrentPage()).to.be.true;

});


Then(/^the user clicks continue with the same ID type selected$/, async function () {
    const photoIdPage = new PhotoIdSelectionPageEdit(await this.page);
  
    await photoIdPage.continue();
});


Then(/^the user is navigated back to the Check My Answers Screen$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});
