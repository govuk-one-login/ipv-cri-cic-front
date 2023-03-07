module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */s
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/landingPage";
  }

  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  get poLink() {
  return this.page.locator('[href*="https://www.postoffice.co.uk/identity/in-branch-verification-service"]');

  }

   async postOfficeLink() {
    await this.poLink.click();
    await this.page.locator("#ensCloseBanner").click();
    console.log(">> Clicked on Accept All button");
  }


};
