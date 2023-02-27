module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/checkDetails";
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

  get expiryDateLink() {
    return this.page.locator('[href*="/nonUKPassportDetails/edit"]');
  }
  
  async changeExpiryDate(){
    await this.expiryDateLink.click();
  }
               
};
