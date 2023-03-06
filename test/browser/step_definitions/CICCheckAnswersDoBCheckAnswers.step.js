const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage, DateOfBirthPageEdit }  = require("../pages");

Given(/^the user has navigated to Check my Answers page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});

When(/^the DoB edit link is clicked$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    await cdPage.changeDoB();

})

Then(/^the user is navigated back to the DoB page$/, async function () {
    const doBPage = new DateOfBirthPageEdit (await this.page);

    expect(await doBPage.isCurrentPage()).to.be.true;

});

Then(/^the user clicks continue on the DoB page$/, async function () {
    const doBPage = new DateOfBirthPageEdit(await this.page);

    await doBPage.continue();

});

Then(/^the user navigates back to the Check My Answers Page from DoB page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});
