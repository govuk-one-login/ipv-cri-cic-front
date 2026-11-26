import { Given, When, Then } from "@cucumber/cucumber";
import assert from "node:assert";
import { CheckDetailsPage } from "../pages/checkDetailsPage.js";

Given(/^the user has completed the previous CIC screens$/, async function () {
  const cpdPage = new CheckDetailsPage(await this.page);
  assert.strictEqual(await cpdPage.isCurrentPage(), true);
  await this.page.waitForLoadState("networkidle");
});

Given(
  /^the user has completed the previous CIC No Photo ID screens$/,
  async function () {
    const cpdPage = new CheckDetailsPage(await this.page);
    assert.strictEqual(await cpdPage.isCurrentPageNoPhotoID(), true);
    await this.page.waitForLoadState("networkidle");
  },
);

Given(
  /^the user has completed the previous CIC Low Confidence screens$/,
  async function () {
    const cpdPage = new CheckDetailsPage(await this.page);
    assert.strictEqual(await cpdPage.isCurrentPageLowConfidence(), true);
    await this.page.waitForLoadState("networkidle");
  },
);

When(
  /^the user clicks the Check My Answers Submit button$/,
  { timeout: 2 * 50000 },
  async function () {
    const cmPage = new CheckDetailsPage(await this.page);

    await cmPage.continue();
    this.state = await cmPage.setSessionState();
    this.authCode = await cmPage.setAuthCode();
  },
);

Then(
  "session details are correctly stored in DB for a {string} journey",
  { timeout: 4 * 50000 },
  async function (journeyType) {
    assert.notStrictEqual(this.sessionId, null);
    console.log("Session ID:" + this.sessionId);
    assert.strictEqual(this.authSessionState, "CIC_AUTH_CODE_ISSUED");
    assert.strictEqual(this.journey, journeyType);
  },
);
