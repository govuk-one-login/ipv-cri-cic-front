const { Given, Then, When } = require("@cucumber/cucumber");

const { RelyingPartyPage, LandingPage, NameEntryPage } = require("../pages");

const { expect } = require("chai");

Given(
  /^([^"]*) is using the system$/,
  { timeout: 2 * 5000 },
  async function (name) {
    const claim = this.allUserClaims[name];
    const rpPage = new RelyingPartyPage(this.page);

    await rpPage.goto(claim);
  },
);

When(
  "they have provided their details",
  {
    timeout: 10 * 1000,
  },
  async function () {},
);

Then("they should be redirected to the F2F nameEntry", async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  expect(await nameEntryPage.isCurrentPage()).to.be.true;
  expect(await nameEntryPage.checkTitle()).to.contain(
    "Enter your name exactly as it appears on your photo ID",
  );
});

Then("they should be redirected to the BAV nameEntry", async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  expect(await nameEntryPage.isCurrentPage()).to.be.true;
  expect(await nameEntryPage.checkTitle()).to.contain(
    "Enter your name as it appears on your bank or building society account",
  );
  expect(await nameEntryPage.checkSubTitleForBAV()).to.contain(
    "Check your banking app, online bank account or bank statement for the full registered name." &&
      "The name on your bank card might only use your initials.",
  );
});

Then("they should be redirected as an error", function () {
  const rpPage = new RelyingPartyPage(this.page);

  expect(rpPage.isRelyingPartyServer()).to.be.true;

  expect(rpPage.hasErrorQueryParams()).to.be.true;
});

Then("the language toggle is present on the screen", async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  await nameEntryPage.languageTogglePresent();
});

Then(
  "The HTML Language Attribute is set to {string}",
  async function (languageAttribute) {
    const nameEntryPage = new NameEntryPage(await this.page);
    expect(await nameEntryPage.returnLanguageAttribute()).to.equal(
      languageAttribute
    );
  }
);

When("the user switches language to {string}", async function (language) {
  const nameEntryPage = new NameEntryPage(await this.page);
  await nameEntryPage.selectLanguageToggle(language);
});

When(
  "the language toggle updates the {string} hyperlink",
  async function (language) {
    const nameEntryPage = new NameEntryPage(await this.page);
    expect(await nameEntryPage.returnLanguageToggleHref(language)).to.be.null;
  }
);
