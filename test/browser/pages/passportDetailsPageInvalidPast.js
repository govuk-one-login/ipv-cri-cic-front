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

  async expiryDate() {
    const lowerUTC = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 18,
      new Date().getDate() - 1
    )
    .toISOString();
    const fullDate = lowerUTC.split("T")[0]
    const expDay = fullDate.split("-")[2]
    const expMonth = fullDate.split("-")[1]
    const expYear = fullDate.split("-")[0]
    await this.page.locator("#passportExpiryDate-day").fill(expDay);
    await this.page.locator("#passportExpiryDate-month").fill(expMonth);
    await this.page.locator("#passportExpiryDate-year").fill(expYear);
  }
};
