const { Before, BeforeAll, AfterAll, After } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

BeforeAll({ timeout: 2 * 5000 }, async function () {
  require("dotenv").config();
  // Browsers are expensive in Playwright so only create 1
  global.browser = process.env.GITHUB_ACTIONS
    ? await chromium.launch()
    : await chromium.launch({
        // Set headless to false to watch test runs
        headless: true,
        // Slow so we can see things happening
        //slowMo: 1000,
      });
});

AfterAll(async function () {
  await global.browser.close();
});

// Create a new test context and page per scenario
Before(async function () {
  this.context = await global.browser.newContext({});

  if (this.SCENARIO_ID_HEADER) {
    await this.context.setExtraHTTPHeaders({
      "x-scenario-id": this.SCENARIO_ID_HEADER,
    });
  }

  this.page = await this.context.newPage();
});

// Cleanup after each scenario
After(async function () {
  await this.page.close();
  await this.context.close();
});
