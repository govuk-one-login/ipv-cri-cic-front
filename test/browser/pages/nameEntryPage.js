module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5020/nameEntry";
    }
  
  async isCurrentPage() {
      return await this.page.url() === this.url;
  }
  
    async continue() {
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
  