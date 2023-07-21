module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/nameEntry";
    this.firstName;
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async enterSurname(lastName) {
    await this.page.locator("#surname").fill(lastName);
  }

  async enterFirstName(firstName) {
    await this.page.locator("#firstName").fill(firstName);
  }

  async returnFirstName() {
    return this.firstName;
  }

  async enterMiddleName(middleName) {
    await this.page.locator("#middleName").fill(middleName);
  }

  async back() {
    await this.page.click("#back");
  }

  async checkErrorText() {
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim();
  }

  async checkFirstNameErrorText() {
    const errorText = await this.page.locator('[href="#firstName"]').textContent();
    return errorText.trim();
  }

  async checkLastNameErrorText() {
    const errorText = await this.page.locator('[href="#surname"]').textContent();
    return errorText.trim();
  }

};




