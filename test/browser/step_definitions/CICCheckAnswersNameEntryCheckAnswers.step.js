const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage, NameEntryPageEdit, DateOfBirthPage }  = require("../pages");

Given(/^the user has navigated to Check My Answers Page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});

When(/^the name entry edit link is clicked$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    await cdPage.changeName();

})

Then(/^the user is navigated back to the name entry page$/, async function () {
    const nameEntryPage = new NameEntryPageEdit(await this.page);

    expect(await nameEntryPage.isCurrentPage()).to.be.true;

    //await nameEntryPage.clearFields();
    await nameEntryPage.enterFirstName();
    await nameEntryPage.enterMiddleName();

});

Then(/^the user clicks continue on the Name Entry page$/, async function () {
    const nameEntryPage = new NameEntryPageEdit(await this.page);

    await nameEntryPage.continue();

});

Then(/^the user navigates back to the Check My Answers Page from Name Entry$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});


  When(/^the Back button is clicked$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);
  
    await cdPage.back();
  
  });
  
  Then(/^the user is routed to the screen they were previously on$/, async function () {
    const doBPage = new DateOfBirthPage(await this.page);
  
    expect(await doBPage.isCurrentPage()).to.be.true;
  });

 