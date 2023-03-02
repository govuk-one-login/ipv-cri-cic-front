module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/nonUKPassportDetails/edit";
  }


  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async expiryDate() {
    const expDay = new Date().getDate().toString()
    const currentMonth = new Date().getMonth() + 1
    const expMonth = currentMonth.toString()
    const expYear = new Date().getFullYear().toString()
    await this.page.locator("#nonUKPassportExpiryDate-day").fill(expDay);
    await this.page.locator("#nonUKPassportExpiryDate-month").fill(expMonth);
    await this.page.locator("#nonUKPassportExpiryDate-year").fill(expYear);
  }
};
