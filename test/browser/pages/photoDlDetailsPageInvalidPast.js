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

  async expiryDate() {
    const tomorrow = new Date().getDate() + 1
    const expDay = tomorrow.toString()
    const currentMonth = new Date().getMonth() + 1
    const expMonth = currentMonth.toString()
    const pastYear = new Date().getFullYear() - 3
    const expYear = pastYear.toString()
    await this.page.locator("#photocardDlExpiryDate-day").fill(expDay);
    await this.page.locator("#photocardDlExpiryDate-month").fill(expMonth);
    await this.page.locator("#photocardDlExpiryDate-year").fill(expYear);
  }
};
