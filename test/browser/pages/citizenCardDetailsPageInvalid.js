module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5020/citizenCardDetails";
    }
  
  
    async isCurrentPage() {
      return await this.page.url() === this.url;
    }
  
    async continue() {
      await this.page.click("#continue");
    }
  
    async expiryDateDay() {
      await this.page.locator("#citizenCardExpiryDate-day").fill("01");
    }
  
    async expiryDateMonth() {
      await this.page.locator("#citizenCardExpiryDate-month").fill("08");
    }
  
    async expiryDateYear() {
      await this.page.locator("#citizenCardExpiryDate-year").fill("2029");
    }
  
  
  };