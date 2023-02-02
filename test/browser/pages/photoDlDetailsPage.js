module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/photocardDlDetails";
  }


  async isCurrentPage() {
    console.log(">>In photoDlDetailsPage.js");
    console.log(">>In isCurrentPage function");

    return await this.page.url() === this.url;
  }

  async continue() {
    console.log(">>In photoDlDetailsPage.js");
    console.log(">>In continue function");
    await this.page.click("#continue");
  }

  async expiryDateDay() {
    await this.page.locator("#photocardDlExpiryDate-day").fill("31");
  }

  async expiryDateMonth() {
    await this.page.locator("#photocardDlExpiryDate-month").fill("12");
  }

  async expiryDateYear() {
    await this.page.locator("#photocardDlExpiryDate-year").fill("2025");
  }


};