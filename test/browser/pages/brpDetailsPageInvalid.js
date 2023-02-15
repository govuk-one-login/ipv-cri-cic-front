module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/brpDetails";
  }


  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async expiryDateDay() {
    await this.page.locator("#brpExpiryDate-day").fill("30");
  }

  async expiryDateMonth() {
    await this.page.locator("#brpExpiryDate-month").fill("10");
  }

  async expiryDateYear() {
    await this.page.locator("#brpExpiryDate-year").fill("2025");
  }


};