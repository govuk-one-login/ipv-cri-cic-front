import { Given, Then, When } from "@cucumber/cucumber";
import assert from "node:assert";
import { RelyingPartyPage } from "../pages/relyingPartyPage.js";
import { NameEntryPage } from "../pages/nameEntryPage.js";

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

Then("they should be redirected to the CIC nameEntry", async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  assert.strictEqual(await nameEntryPage.isCurrentPage(), true);
  assert.ok(
    (await nameEntryPage.checkTitle()).includes(
      "Enter your name exactly as it appears on your photo ID",
    ),
  );
  await this.page.waitForLoadState("networkidle");
});

Then(
  "they should be redirected to the Low Confidence nameEntry",
  async function () {
    const nameEntryPage = new NameEntryPage(await this.page);
    assert.strictEqual(await nameEntryPage.isCurrentPageLowConfidence(), true);
    assert.ok(
      (await nameEntryPage.checkTitle()).includes(
        "Enter your name as it appears on your HMRC record",
      ),
    );
    await this.page.waitForLoadState("networkidle");
  },
);

Then("they should be redirected to the BAV nameEntry", async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  assert.strictEqual(await nameEntryPage.isCurrentPageNoPhotoID(), true);
  assert.ok(
    (await nameEntryPage.checkTitle()).includes(
      "Enter your name as it appears on your bank or building society account",
    ),
  );
  assert.ok(
    (await nameEntryPage.checkSubTitleForBAV()).includes(
      "Check your banking app, online bank account or bank statement for the full registered name." && // eslint-disable-line
        "The name on your bank card might only use your initials.",
    ),
  );
  await this.page.waitForLoadState("networkidle");
});

Then("the language toggle is present on the screen", async function () {
  const nameEntryPage = new NameEntryPage(await this.page);
  await nameEntryPage.languageTogglePresent();
});

Then(
  "The HTML Language Attribute is set to {string}",
  async function (languageAttribute) {
    const nameEntryPage = new NameEntryPage(await this.page);
    assert.strictEqual(
      await nameEntryPage.returnLanguageAttribute(),
      languageAttribute,
    );
  },
);

When("the user switches language to {string}", async function (language) {
  const nameEntryPage = new NameEntryPage(await this.page);
  await nameEntryPage.selectLanguageToggle(language);
});

When(
  "the language toggle updates the {string} hyperlink",
  async function (language) {
    const nameEntryPage = new NameEntryPage(await this.page);
    assert.strictEqual(
      await nameEntryPage.returnLanguageToggleHref(language),
      null,
    );
  },
);

Then("the {string} cookie has been set", async function (cookieName) {
  // Wait for the page to fully load
  await this.page.waitForLoadState("networkidle", { timeout: 5000 });
  const cookies = await this.page.context().cookies();
  const expectedCookie = cookies.find((cookie) => cookie.name === cookieName);
  assert.ok(expectedCookie);
});
