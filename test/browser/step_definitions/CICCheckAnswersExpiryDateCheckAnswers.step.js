const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage, NonPassportDetailsPageValidEdit }  = require("../pages");

Given(/^the user has navigated to the Check My Answers Page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});

When(/^the expiry date edit link is clicked$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    await cdPage.changeExpiryDate();

})

Then(/^the user is navigated back to the expiry date entry page$/, async function () {
    const passport = new NonPassportDetailsPageValidEdit(await this.page);

    expect(await passport.isCurrentPage()).to.be.true;

});

Then(/^clicking the continue button navigates the user to the Check My Answers screen$/, async function () {
    const passport = new NonPassportDetailsPageValidEdit(await this.page);

    await passport.continue();

});

Then(/^the user navigates back to the Check My Answers Page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});
