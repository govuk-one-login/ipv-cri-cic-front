module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/enter-date-birth/edit";
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

  async dateOfBirth() {
    const birthDay = new Date().getDate().toString();
    const month = new Date().getMonth() + 1;
    const birthMonth = month.toString();
    const year = new Date().getFullYear() - 36;
    const birthYear = year.toString();
    await this.page.locator("#dateOfBirth-day").fill(birthDay);
    await this.page.locator("#dateOfBirth-month").fill(birthMonth);
    await this.page.locator("#dateOfBirth-year").fill(birthYear);
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator("#error-summary-title")
      .textContent();
    return errorText.trim();
  }
};
