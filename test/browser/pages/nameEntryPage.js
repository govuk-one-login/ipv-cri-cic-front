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
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim();
  }

};



