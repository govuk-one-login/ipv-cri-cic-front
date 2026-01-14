module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.ORCHESTRATOR_STUB_URL = process.env.ORCHESTRATOR_STUB_URL;
    this.KENNETH_DECERQUIERA = require("../support/KennethDecerquiera.json");
    this.ALEXANDRA_ELEGBA = require("../support/AlexandraElegba.json");
    this.handoff_path = "/ipv/page/page-face-to-face-handoff";
  }

  async goto() {
    await this.page.goto(this.ORCHESTRATOR_STUB_URL);
  }

  async fullJourneyRoute(randomUUID) {
    await this.page.locator("#userIdText").fill(randomUUID);
    await this.page.locator(".govuk-button").nth(0).click();
  }

  async f2fPyicRoute() {
    await this.page.locator("#journey").click();
    await this.page.locator("#submitButton").click();
    await this.page.locator("#select-device-choice").click();
    await this.page.locator(".govuk-button").nth(4).click();
    await this.page.locator("#smartphone-choice-3").click();
    await this.page.locator(".govuk-button").nth(4).click();
    await this.page.locator("#journey-4").click();
    await this.page.locator(".govuk-button").nth(4).click();
  }

  getUserData(name) {
    let userData;
    switch (name) {
      case "Kenneth Decerqueira": {
        userData = this.KENNETH_DECERQUIERA;
        break;
      }
      case "Alexandra Elegba": {
        userData = this.ALEXANDRA_ELEGBA;
        break;
      }
    }
    return userData;
  }

  async enterCicDetails(name) {
    const userData = this.getUserData(name);
    await this.page.locator("#surname").fill(userData.surname);
    await this.page.locator("#firstName").fill(userData.firstName);
    await this.page.locator("#continue").click();
    await this.page.locator("#dateOfBirth-day").fill(userData.dobDay);
    await this.page.locator("#dateOfBirth-month").fill(userData.dobMonth);
    await this.page.locator("#dateOfBirth-year").fill(userData.dobYear);
    await this.page.locator("#continue").click();
    await this.page.locator("#continue").click();
  }

  async enterAddressCriDetails(name) {
    const userData = this.getUserData(name);
    await this.page.locator("#addressSearch").fill(userData.postcode);
    await this.page.locator("#continue").click();
    await this.page.selectOption("#addressResults", userData.address);
    await this.page.locator("#continue").click();
    await this.page.locator("#addressYearFrom").fill(userData.yearMovedIn);
    await this.page.locator("#continue").click();
    await this.page.locator(".govuk-button.button").click();
  }

  async fraudCriCheck() {
    await this.page.locator("#continue").click();
  }

  async navigateToDocumentSelection() {
    await this.page.locator(".govuk-button.button").click();
  }

  async returnNumberOfDocuments() {
    return await this.page.locator(".govuk-radios__input").count();
  }

  async enterDocumentDetails(name) {
    const userData = this.getUserData(name);
    if ((await this.page.locator(".govuk-radios__input").count()) < 4) {
      await this.page.locator("#photoIdChoiceThinFile").click();
    } else {
      await this.page.locator("#photoIdChoice").click();
    }
    await this.page.locator("#continue").click();
    await this.page.locator("#ukPassportExpiryDate-day").fill(userData.expDay);
    await this.page
      .locator("#ukPassportExpiryDate-month")
      .fill(userData.expMonth);
    await this.page
      .locator("#ukPassportExpiryDate-year")
      .fill(userData.expYear);
    await this.page.locator("#continue").click();
  }

  async enterPostOfficeDetails(name) {
    const userData = this.getUserData(name);
    await this.page.locator("#postcode").fill(userData.postcode);
    await this.page.locator("#continue").click();
    await this.page.locator("#branches").click();
    await this.page.locator("#continue").click();
  }

  async checkYourAnswers() {
    await this.page.locator("#continue").click();
  }

  async isF2FHandoffPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.handoff_path;
  }
};
