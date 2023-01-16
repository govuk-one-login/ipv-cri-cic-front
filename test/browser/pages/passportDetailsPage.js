module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5020/passportDetails";
    }
  
    isCurrentPage() {
      console.log(">>In passportDetails.js");
      console.log(">>In isCurrentPage function");
  
      return this.page.url() === this.url;
    }
  
    async continue() {
       console.log(">>In passPortDetailsPage.js");
       console.log(">>In continue function");
      await this.page.click("#continue");
    }

    
  };