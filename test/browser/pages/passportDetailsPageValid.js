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
    const expDay = new Date().getDate().toString()
    await this.page.locator("#passportExpiryDate-day").fill(expDay);
  }

  async expiryDateMonth() {
    const currentMonth = new Date().getMonth() + 1
    const expMonth = currentMonth.toString()
    await this.page.locator("#passportExpiryDate-month").fill(expMonth);
  }

  async expiryDateYear() {
    const expYear = new Date().getFullYear().toString()
    await this.page.locator("#passportExpiryDate-year").fill(expYear);
  }


  async checkErrorText(){
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim(); 
  }
};
