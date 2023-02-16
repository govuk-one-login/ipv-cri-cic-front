const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { YoungScotNECDetailsPageValid } = require("../pages");

  When(/^the user clicks the continue button only on the YSNECPage$/, async function () {
    const youngScotNECDetailsPage = new YoungScotNECDetailsPageValid(await this.page);

    await youngScotNECDetailsPage.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the YSNECPage$/, async function () {
        const youngScotNECDetailsPage = new YoungScotNECDetailsPageValid(await this.page);

        expect(await youngScotNECDetailsPage.isCurrentPage()).to.be.true;

        const inlineError = 'There is a problem';

        const error = await youngScotNECDetailsPage.checkErrorText();
          
        expect(await error).to.equal(inlineError);

  });
