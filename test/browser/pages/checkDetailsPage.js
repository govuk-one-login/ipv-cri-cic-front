module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/checkDetails";
  }

  async isCurrentPage() {
     console.log(">>In checkDetailsPage - isCurrentPage function")

    return await this.page.url() === this.url;
  }

  async continue() {
    console.log(">>In checkDetailsPage - continue function")
    
    await this.page.click("#continue");
  }

};
