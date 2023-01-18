module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/passportDetails";
  }

  isCurrentPage() {
    console.log(">>In passportDetails.js");
    console.log(">>In isCurrentPage function");

    return this.page.url() === this.url;
  }

  async continue() {
    console.log(">>In passPortDetailsPage.js");
    console.log(">>In continue function");
    await this.page.click("#continue");
  }

  async expiryDateDay() {
    this.page.locator("#passportExpiryDate-day").fill("31");
  }

  async expiryDateMonth() {
    this.page.locator("#passportExpiryDate-month").fill("3");
    console.log(`>>Expiry Month: $this.page.locator("#passportExpiryDate-month")`); 
  }

  async expiryDateYear() {
    this.page.locator("#passportExpiryDate-year").fill("2025");
  }


};