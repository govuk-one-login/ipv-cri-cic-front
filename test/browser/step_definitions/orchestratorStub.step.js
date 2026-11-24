import { Given, Then, When } from "@cucumber/cucumber";
import { randomUUID } from "node:crypto";
import { expect } from "chai";
import { OrchestratorStubPage } from "../pages/orchestratorStubPage.js";

Given(
  "the user navigates to the Orchestrator Stub Page",
  { timeout: 4 * 50000 },
  async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.goto();
  },
);

When(
  "the user signs in using a random userId",
  { timeout: 4 * 50000 },
  async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    const uuid = randomUUID();
    await stubPage.fullJourneyRoute(uuid);
  },
);

When(
  "the user decides to prove their identity using F2F",
  { timeout: 4 * 50000 },
  async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.f2fPyicRoute();
  },
);

When(
  "{string} enters their CIC details",
  { timeout: 4 * 50000 },
  async function (name) {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.enterCicDetails(name);
  },
);

When(
  "{string} enters their Address CRI details",
  { timeout: 4 * 100000 },
  async function (name) {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.enterAddressCriDetails(name);
  },
);

When(
  "the user completes their Fraud CRI check",
  { timeout: 4 * 100000 },
  async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.fraudCriCheck();
    await stubPage.navigateToDocumentSelection();
  },
);

Then(
  "the user should see the full list of document types",
  { timeout: 4 * 50000 },
  async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    expect(await stubPage.returnNumberOfDocuments()).to.equal(7);

    await stubPage.navigateToDocumentSelection();
  },
);

Then(
  "the user should see a limited list of document types",
  { timeout: 4 * 50000 },
  async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    expect(await stubPage.returnNumberOfDocuments()).to.equal(3);
  },
);

When(
  "{string} enters their F2F CRI details",
  { timeout: 4 * 50000 },
  async function (name) {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.enterDocumentDetails(name);
    await stubPage.enterPostOfficeDetails(name);
    await stubPage.checkYourAnswers();
  },
);

Then("the user should be shown the F2F handoff page", async function () {
  const stubPage = new OrchestratorStubPage(this.page);
  expect(await stubPage.isF2FHandoffPage()).to.be.true;
});
