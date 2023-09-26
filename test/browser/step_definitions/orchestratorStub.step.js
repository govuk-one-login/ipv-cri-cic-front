const { Given, Then, When } = require("@cucumber/cucumber");

const { OrchestratorStubPage  } = require("../pages");

const { v4 } = require("uuid");

const { expect } = require("chai");


Given("the user navigates to the Orchestrator Stub Page", { timeout: 2 * 50000 }, async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.goto();
});

When("the user signs in using a random userId", { timeout: 2 * 50000 }, async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    const uuid = v4();
    await stubPage.fullJourneyRoute(uuid);
});

When("the user decides to prove their identity using F2F", { timeout: 2 * 50000 }, async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.f2fPyicRoute();
});

When("{string} enters their CIC details", { timeout: 4 * 50000 }, async function (name) {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.enterCicDetails(name);
});

When("{string} enters their Address CRI details", { timeout: 4 * 50000 }, async function (name) {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.enterAddressCriDetails(name);
});

When("the user completes their Fraud CRI check", { timeout: 4 * 50000 }, async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.fraudCriCheck();
});

When("{string} enters their F2F CRI details", { timeout: 4 * 50000 }, async function (name) {
    const stubPage = new OrchestratorStubPage(this.page);
    await stubPage.enterDocumentDetails(name);
    await stubPage.enterPostOfficeDetails(name);
    await stubPage.checkYourAnswers();
});

Then("the user should be shown the F2F handoff page", async function () {
    const stubPage = new OrchestratorStubPage(this.page);
    expect(await stubPage.isF2FHandoffPage()).to.be.true;
});