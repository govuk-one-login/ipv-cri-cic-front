module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/passportDetails";
  }


  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async expiryDateDay() {
    await this.page.locator("#passportExpiryDate-day").fill("09");
  }

  async expiryDateMonth() {
    await this.page.locator("#passportExpiryDate-month").fill("07");
  }

  async expiryDateYear() {
    await this.page.locator("#passportExpiryDate-year").fill("2034");
  }

};
