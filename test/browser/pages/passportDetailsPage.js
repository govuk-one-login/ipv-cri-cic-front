module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/passportDetails";
  }


  async isCurrentPage() {
    console.log(">>In passportDetails.js");
    console.log(">>In isCurrentPage function");

    return await this.page.url() === this.url;
  }

  async continue() {
    console.log(">>In passPortDetailsPage.js");
    console.log(">>In continue function");
    await this.page.click("#continue");
  }

  async expiryDateDay() {
    await this.page.locator("#passportExpiryDate-day").type("31");
  }

  async expiryDateMonth() {
    await this.page.locator("#passportExpiryDate-month").fill("3");
  }

  async expiryDateYear() {
    await this.page.locator("#passportExpiryDate-year").fill("2025");
  }


};