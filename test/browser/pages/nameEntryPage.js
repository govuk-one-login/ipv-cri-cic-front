module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5020/nameEntry";
    }
  
  async isCurrentPage() {
       console.log(">>In nameEntryPage.js - isCurrentPage function");
       console.log(this.url);
      return await this.page.url() === this.url;
  }
  
    async continue() {
      // console.log(">>In nameEntryPage.js");
      // console.log(">>In continue");
      await this.page.click("#continue");
    }
  
    async enterSurname(){
      await this.page.locator("#surname").fill("Hartley");
    }

    async enterFirstName(){
      await this.page.locator("#firstName").fill("James");
    }

    async enterMiddleName(){
      await this.page.locator("#middleName").fill("Robert");
    }
  };
  