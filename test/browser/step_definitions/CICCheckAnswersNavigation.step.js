import { Given, When, Then } from "@cucumber/cucumber";
import assert from "node:assert";
import { CheckDetailsPage } from "../pages/checkDetailsPage.js";
import { DateOfBirthPage } from "../pages/dateOfBirthPage.js";
import { NameEntryPage } from "../pages/nameEntryPage.js";

Given(
  /^the user has navigated to the Check My Answers page$/,
  async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    assert.strictEqual(await cdPage.isCurrentPage(), true);
    await this.page.waitForLoadState("networkidle");
  },
);

When(
  /^the Back link is clicked on the Check My Answers page$/,
  async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    await cdPage.back();
  },
);

Then(/^the user is navigated back to the DOB Entry page$/, async function () {
  const doBPage = new DateOfBirthPage(await this.page);

  assert.strictEqual(await doBPage.isCurrentPage(), true);
  await this.page.waitForLoadState("networkidle");
});

Given(/^the user has navigated to the DoB Entry page$/, async function () {
  const dobPage = new DateOfBirthPage(await this.page);

  assert.strictEqual(await dobPage.isCurrentPage(), true);
  await this.page.waitForLoadState("networkidle");
});

When(/^the Back link is clicked on the DoB Entry page$/, async function () {
  const dobPage = new DateOfBirthPage(await this.page);

  await dobPage.back();
});

Then(
  /^the user is navigated back to the screen that they came from - Name Entry$/,
  async function () {
    const nameEntry = new NameEntryPage(await this.page);

    assert.strictEqual(await nameEntry.isCurrentPage(), true);
    await this.page.waitForLoadState("networkidle");
  },
);
