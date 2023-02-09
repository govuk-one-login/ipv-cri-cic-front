const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const {NonUKPassportDetailsPage, PhotoIdExpiryPage} = require("../pages");

  Given(/^the date entered is outside the accepted Non UK Passport expiration window$/, async function () {

    const nonUKPassport = new NonUKPassportDetailsPage(await this.page);

    await nonUKPassport.expiryDateDay();

    await nonUKPassport.expiryDateMonth();

    await nonUKPassport.expiryDateYear();

  });


  When(/^the user clicks the continue button on the Non UK Passport Page$/, async function () {

    const nonUKPassport = new NonUKPassportDetailsPage(await this.page);

    expect(await nonUKPassport.isCurrentPage()).to.be.true;

    await nonUKPassport.continue();

  });


  Then(/^the user is routed to the Expired Date Error Screen from the Non UK Passport Screen$/, async function () {

    const photoIdExpPg = new PhotoIdExpiryPage(await this.page);

    expect(await photoIdExpPg.isCurrentPage()).to.be.true;

  });