module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/enter-name";
    this.firstName;
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.getByTestId("enter-name-continue-btn").click();
  }

  async clickSupportLink() {
    await this.page.locator("#contactSupport").click();
  }

  async characterDetailsLink() {
    await this.page.locator("#characterDetails").click();
  }

  async enterSurname() {
    await this.page.locator("#surname").fill("Hartley");
  }

  async enterFirstName() {
    await this.page.locator("#firstName").fill("James");
  }

  async returnFirstName() {
    return this.firstName;
  }

  async enterMiddleName() {
    await this.page.locator("#middleName").fill("Robert");
  }

  async back() {
    await this.page.click("#back");
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator(".govuk-error-summary__title")
      .textContent();
    return errorText.trim();
  }

  async checkTitle() {
    const titleText = await this.page.locator("#header").textContent();
    return titleText.trim();
  }

  async checkSubTitleForBAV() {
    const subTitleText = await this.page
      .locator("#noPhotoIdInstructions")
      .textContent();
    return subTitleText.trim();
  }
};
