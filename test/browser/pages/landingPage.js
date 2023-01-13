module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/landingPage";
  }

  isCurrentPage() {
    // console.log(">>In landingPage.js");
    // console.log(">>In isCurrentPage function");

    return this.page.url() === this.url;
  }

  async continue() {
    // console.log(">>In landingPage.js");
    // console.log(">>In continue");
    await this.page.click("#continue");
  }
};
