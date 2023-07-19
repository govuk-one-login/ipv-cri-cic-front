const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { NameEntryPage }  = require("../pages");

Given(/^only one mandatory name field has been entered$/, async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    await nameEntryPage.enterSurname("Kyle");
    await nameEntryPage.enterMiddleName("Peter");

  }
);

Given(/^an Invalid Character has been entered in the firstName field$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  await nameEntryPage.enterFirstName("Billy:Joel");
  await nameEntryPage.enterSurname("Walker-Peters");

}
);

Given(/^an Invalid Character has been entered in the lastName field$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  await nameEntryPage.enterFirstName("Kyle");
  await nameEntryPage.enterSurname("Walker:Peters");

}
);

Given(/^a Numerical Value has been entered in the firstName field$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  await nameEntryPage.enterFirstName("Billy123");
  await nameEntryPage.enterSurname("Walker");

}
);

Given(/^a Numerical Value has been entered in the lastName field$/, async function () {
  const nameEntryPage = new NameEntryPage(await this.page);

  await nameEntryPage.enterFirstName("Kyle");
  await nameEntryPage.enterSurname("Walker123");

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

Then(
  /^the user sees an inline error message displayed in the NameEntry screen for firstName$/,
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    expect(await nameEntryPage.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';
    const fieldError = 'Enter your first name as it appears on your photo ID';

    const error = await nameEntryPage.checkErrorText();
    const fieldErrorText = await nameEntryPage.checkFirstNameErrorText();

    expect(await error).to.equal(inlineError);
    expect(await fieldError).to.equal(fieldErrorText);

  }
);

Then(
  /^the user sees an inline error message displayed in the NameEntry screen for lastName$/, { timeout: 2 * 50000 },
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);

    expect(await nameEntryPage.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';
    const fieldError = 'Enter your last name as it appears on your photo ID';

    const error = await nameEntryPage.checkErrorText();
    const fieldErrorText = await nameEntryPage.checkLastNameErrorText();

    expect(await error).to.equal(inlineError);
    expect(await fieldError).to.equal(fieldErrorText);


  }
);
