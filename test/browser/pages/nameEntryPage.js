module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/enter-name-photo-id";
    this.firstName;
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async enterSurname(surname) {
    await this.page.locator("#surname").fill(surname);
  }

  async enterFirstName(firstName) {
    await this.page.locator("#firstName").fill(firstName);
  }

  async enterMiddleName(middleName) {
    await this.page.locator("#middleName").fill(middleName);
  }

  async returnFirstName() {
    return this.firstName;
  }

  async back() {
    await this.page.click("#back");
  }

  async checkErrorText() {
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim();
  }

  async getInvalidFirstNameErrorText() {
    const errorText = await this.page.locator("#firstName-error").textContent();
    return errorText.trim();
  }

  async getInvalidMiddleNameErrorText() {
    const errorText = await this.page.locator("#middleName-error").textContent();
    return errorText.trim();
  }

  async getInvalidLastNameErrorText() {
    const errorText = await this.page.locator("#surname-error").textContent();
    return errorText.trim();
  }

};