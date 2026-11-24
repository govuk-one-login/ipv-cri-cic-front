import { When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { ErrorPage } from "../pages/errorPage.js";

When("there is an immediate error", () => {});

Then("they should see the unrecoverable error page", async function () {
  const errorPage = new ErrorPage(this.page);

  const errorTitle = await errorPage.getErrorTitle();

  expect(errorTitle).to.equal(errorPage.getSomethingWentWrongMessage());
});
