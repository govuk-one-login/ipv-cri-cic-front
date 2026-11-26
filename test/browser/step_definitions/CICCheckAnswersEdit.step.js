import { Given, When, Then } from "@cucumber/cucumber";
import assert from "node:assert";
import { CheckDetailsPage } from "../pages/checkDetailsPage.js";
import { NameEntryEditPage } from "../pages/nameEntryEditPage.js";
import { DateOfBirthPage } from "../pages/dateOfBirthPage.js";
import { DateOfBirthEditPage } from "../pages/dateOfBirthEditPage.js";

Given(/^the user has navigated to Check my Answers page$/, async function () {
  const cdPage = new CheckDetailsPage(await this.page);

  assert.strictEqual(await cdPage.isCurrentPage(), true);
  await this.page.waitForLoadState("networkidle");
});

When(/^the name entry edit link is clicked$/, async function () {
  const cdPage = new CheckDetailsPage(await this.page);

  await cdPage.changeName();
});

Then(/^the user is navigated back to the name entry page$/, async function () {
  const nameEntryPage = new NameEntryEditPage(await this.page);

  assert.strictEqual(await nameEntryPage.isCurrentPage(), true);

  //await nameEntryPage.clearFields();
  await nameEntryPage.enterFirstName();
  await nameEntryPage.enterMiddleName();
});

Then(/^the user clicks continue on the Name Entry page$/, async function () {
  const nameEntryPage = new NameEntryEditPage(await this.page);

  await nameEntryPage.continue();
});

Then(
  /^the user navigates back to the Check My Answers Page$/,
  async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    assert.strictEqual(await cdPage.isCurrentPage(), true);
  },
);

When(/^the Back button is clicked$/, async function () {
  const cdPage = new CheckDetailsPage(await this.page);

  await cdPage.back();
});

Then(
  /^the user is routed to the screen they were previously on$/,
  async function () {
    const doBPage = new DateOfBirthPage(await this.page);

    assert.strictEqual(await doBPage.isCurrentPage(), true);
  },
);

When(/^the DoB edit link is clicked$/, async function () {
  const cdPage = new CheckDetailsPage(await this.page);

  await cdPage.changeDoB();
});

Then(/^the user is navigated back to the DoB page$/, async function () {
  const doBPage = new DateOfBirthEditPage(await this.page);

  assert.strictEqual(await doBPage.isCurrentPage(), true);

  await doBPage.dateOfBirth();
});

Then(/^the user clicks continue on the DoB page$/, async function () {
  const doBPage = new DateOfBirthEditPage(await this.page);

  await doBPage.continue();
});

Then(/^the user is navigated back to the previous page/, async function () {
  const doBPage = new DateOfBirthPage(await this.page);

  assert.strictEqual(await doBPage.isCurrentPage(), true);
});

When(/^the user clicks the Continue or Back button$/, async function () {
  const cdPage = new CheckDetailsPage(await this.page);

  assert.strictEqual(await cdPage.isCurrentPage(), true);

  await cdPage.continue();
});

Then(/^the appropriate error page is retrieved and shown$/, async function () {
  const cdPage = new CheckDetailsPage(await this.page);

  // expect(await cdPage.isCurrentPage()).to.be.true

  const inlineError = "Sorry, there is a problem with the service";

  const error = await cdPage.pageFailure();

  console.log(">>inlineError: ", inlineError);

  console.log(">>error: ", error);
  // assert.strictEqual(await error, inlineError);
});
