const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage }  = require("../pages");

Given(/^the user has completed the previous CIC screens$/, async function () {
    const cpdPage = new CheckDetailsPage(await this.page);

    expect(await cpdPage.isCurrentPage()).to.be.true;
  
 });