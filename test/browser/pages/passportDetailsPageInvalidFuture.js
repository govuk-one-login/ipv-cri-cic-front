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
    const tomorrow = new Date().getDate() + 1
    const expDay = tomorrow.toString()
    const currentMonth = new Date().getMonth() + 1
    const expMonth = currentMonth.toString()
    const futureYear = new Date().getFullYear() + 10
    const expYear = futureYear.toString()
    await this.page.locator("#passportExpiryDate-day").fill(expDay);
    await this.page.locator("#passportExpiryDate-month").fill(expMonth);
    await this.page.locator("#passportExpiryDate-year").fill(expYear);
  }
};
