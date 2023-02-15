module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/nonUKPassportDetails";
  }


  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async expiryDateDay() {
    await this.page.locator("#nonUKPassportExpiryDate-day").fill("01");
  }

  async expiryDateMonth() {
    await this.page.locator("#nonUKPassportExpiryDate-month").fill("06");
  }

  async expiryDateYear() {
    await this.page.locator("#nonUKPassportExpiryDate-year").fill("2099");
  }


};