module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5020/euPhotocardDlDetails";
    }
  
  
    async isCurrentPage() {
      console.log(">>In euDrivingLicenceDetailsPage.js");
      console.log(">>In isCurrentPage function");
  
      return await this.page.url() === this.url;
    }
  
    async continue() {
      console.log(">>In euDrivingLicenceDetailsPage.js");
      console.log(">>In continue function");
      await this.page.click("#continue");
    }
  
    async expiryDateDay() {
      await this.page.locator("#euPhotocardDlExpiryDate-day").type("31");
    }
  
    async expiryDateMonth() {
      await this.page.locator("#euPhotocardDlExpiryDate-month").fill("3");
    }
  
    async expiryDateYear() {
      await this.page.locator("#euPhotocardDlExpiryDate-year").fill("2025");
    }
  
  
  };