module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/youngScotNecDetails";
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
    await this.page.locator("#youngScotNationalEntitlementCardExpiryDate-day").fill(expDay);
  }

  async expiryDateMonth() {
    const currentMonth = new Date().getMonth() + 1
    const expMonth = currentMonth.toString()
    await this.page.locator("#youngScotNationalEntitlementCardExpiryDate-month").fill(expMonth);
  }

  async expiryDateYear() {
    const futureYear = new Date().getFullYear() + 15
    const expYear = futureYear.toString()
    await this.page.locator("#youngScotNationalEntitlementCardExpiryDate-year").fill(expYear);
  }
};
