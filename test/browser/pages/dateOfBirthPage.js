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
  
  async back(){
    await this.page.click("#back");
  }

  async dateOfBirth() {
    const birthDay = new Date().getDate().toString()
    const month = new Date().getMonth() + 1
    const birthMonth = month.toString()
    const year = new Date().getFullYear() - 35
    const birthYear = year.toString()
    await this.page.locator("#dateOfBirth-day").fill(birthDay);
    await this.page.locator("#dateOfBirth-month").fill(birthMonth);
    await this.page.locator("#dateOfBirth-year").fill(birthYear);
  }

  async checkErrorText(){
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim(); 
  }
};
