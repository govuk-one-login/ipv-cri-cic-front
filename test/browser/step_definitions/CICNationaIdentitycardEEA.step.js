const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage, NationalIdentityCardEEADetailsPage} = require("../pages");

  Given(/^the date entered is within accepted National Identity Card EEA expiration window$/, async function () {
    const nationalIdentityCardEEADetailsPage = new NationalIdentityCardEEADetailsPage(await this.page);

    await nationalIdentityCardEEADetailsPage.expiryDateDay();

    await nationalIdentityCardEEADetailsPage.expiryDateMonth();

    await nationalIdentityCardEEADetailsPage.expiryDateYear();

  });

  When(/^the user clicks the continue button on the National Identity Card EEA Page$/, async function () {
    const nationalIdentityCardEEADetailsPage = new NationalIdentityCardEEADetailsPage(await this.page);

    await nationalIdentityCardEEADetailsPage.continue();

  });


  Then(/^the user is routed to the next screen in the National Identity Card EEA journey - Name Entry$/, async function () {
        const nameEntryPage = new NameEntryPage(await this.page);

        expect(await nameEntryPage.isCurrentPage()).to.be.true;

  });