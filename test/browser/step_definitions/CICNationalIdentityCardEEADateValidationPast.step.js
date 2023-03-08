const { Given, When, Then, And } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NationalIdentityCardEEADetailsPageInvalidPast, PhotoIdExpiryPage } = require("../pages");

Given(/^the date entered is before the accepted National Identity Card EEA expiration window$/, async function () {

  const nationalIdentityCardEEA = new NationalIdentityCardEEADetailsPageInvalidPast(await this.page);

  await nationalIdentityCardEEA.expiryDate();

});


When(/^the user clicks the continue button on the National Identity Card EEA Past details Page$/, async function () {

  const nationalIdentityCardEEA = new NationalIdentityCardEEADetailsPageInvalidPast(await this.page);

  expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;

  await nationalIdentityCardEEA.continue();

});


Then(/^the user is routed to the Expired Date Error Screen from the National Identity Card EEA Screen$/, async function () {

  const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

  expect(await photoIdExpPg.isCurrentPage()).to.be.true;

});
