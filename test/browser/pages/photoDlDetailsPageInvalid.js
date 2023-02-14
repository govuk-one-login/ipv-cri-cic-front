module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/photocardDlDetails";
  }


  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async expiryDateDay() {
    await this.page.locator("#photocardDlExpiryDate-day").fill("28");
  }

  async expiryDateMonth() {
    await this.page.locator("#photocardDlExpiryDate-month").fill("05");
  }

  async expiryDateYear() {
    await this.page.locator("#photocardDlExpiryDate-year").fill("2022");
  }


};