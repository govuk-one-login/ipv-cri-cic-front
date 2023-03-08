const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { DateOfBirthPage }  = require("../pages");
      

  Given(/^the user clicks the continue button only on the DoBEntryPage$/, async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    await dobPage.continue();

  });


  Then(/^the user sees an inline error message displayed on the DoBEntryPage$/, async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    expect(await dobPage.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await dobPage.checkErrorText();
      
    expect(await error).to.equal(inlineError);
  });
