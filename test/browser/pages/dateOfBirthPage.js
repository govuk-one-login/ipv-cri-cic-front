module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/dateOfBirth";
  }


  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async dateOfBirthDay() {
    await this.page.locator("#dateOfBirth-day").fill("31");
  }

  async dateOfBirthMonth() {
    await this.page.locator("#dateOfBirth-month").fill("3");
  }

  async dateOfBirthYear() {
    await this.page.locator("#dateOfBirth-year").fill("1980");
  }

  async checkErrorText(){
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim(); 
  }

};
