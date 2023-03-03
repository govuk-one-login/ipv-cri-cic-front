module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5020/euPhotocardDlDetails";
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
      const futureYear = new Date().getFullYear() + 75
      const expYear = futureYear.toString()
      await this.page.locator("#euPhotocardDlExpiryDate-day").type(expDay);
      await this.page.locator("#euPhotocardDlExpiryDate-month").fill(expMonth);
      await this.page.locator("#euPhotocardDlExpiryDate-year").fill(expYear);
    }

    async checkErrorText(){
      const errorText = await this.page.locator("#error-summary-title").textContent();
      return errorText.trim(); 
    }
};
