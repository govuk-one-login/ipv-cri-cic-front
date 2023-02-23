const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage }  = require("../pages");
       
Given(/^only one mandatory name field has been entered$/, async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.enterSurname();
    await nameEntryPage.enterMiddleName();

  }
);

When(
  /^the user clicks the continue button in the NameEntry screen$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  
  await nameEntryPage.continue();

});

Then(
  /^the user sees an inline error message displayed in the NameEntry screen$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    expect(await nameEntryPage.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await nameEntryPage.checkErrorText();
      
    expect(await error).to.equal(inlineError);
    
  }
);
