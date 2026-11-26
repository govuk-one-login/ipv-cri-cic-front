import { Given, When, Then } from "@cucumber/cucumber";
import assert from "node:assert";
import userData from "../support/cicUserData.json" with { type: "json" };
import { DateOfBirthPage } from "../pages/dateOfBirthPage.js";
import { CheckDetailsPage } from "../pages/checkDetailsPage.js";

Given(/^the DOB fields are populated with valid values$/, async function () {
  const dobPage = new DateOfBirthPage(await this.page);

  await dobPage.dateOfBirth(userData);
});

When(/^the user clicks the DoB continue button$/, async function () {
  const dobPage = new DateOfBirthPage(await this.page);

  await dobPage.continue();
});

Then(/^they are routed to the Check My Answers Screen$/, async function () {
  const cdPage = new CheckDetailsPage(await this.page);

  assert.strictEqual(await cdPage.isCurrentPage(), true);
  await this.page.waitForLoadState("networkidle");
});

Then(
  /^they are routed to the No Photo ID Check My Answers Screen$/,
  async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    assert.strictEqual(await cdPage.isCurrentPageNoPhotoID(), true);
    await this.page.waitForLoadState("networkidle");
  },
);

Then(
  /^they are routed to the Low Confidence Check My Answers Screen$/,
  async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    assert.strictEqual(await cdPage.isCurrentPageLowConfidence(), true);
    await this.page.waitForLoadState("networkidle");
  },
);

Given(
  /^the user clicks the continue button only on the DoBEntryPage$/,
  async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    await dobPage.continue();
  },
);

Then(
  /^the user sees an inline error message displayed on the DoBEntryPage$/,
  async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    assert.strictEqual(await dobPage.isCurrentPage(), true);

    const inlineError = "There is a problem";

    const error = await dobPage.checkErrorText();

    assert.strictEqual(await error, inlineError);
  },
);
