module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/enter-date-birth";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async back() {
    await this.page.click("#back");
  }

  async dateOfBirth(userData) {
    const dobArray = JSON.stringify(userData.dob).split("-");
    await this.page.locator("#dateOfBirth-day").fill(dobArray[2]);
    await this.page.locator("#dateOfBirth-month").fill(dobArray[1]);
    await this.page
      .locator("#dateOfBirth-year")
      .fill(dobArray[0].replace(/['"]+/g, ""));
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator(".govuk-error-summary__title")
      .textContent();
    return errorText.trim();
  }
};
