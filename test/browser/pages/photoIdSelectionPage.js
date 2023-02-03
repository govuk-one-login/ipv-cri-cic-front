module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/photoIdSelection";
  }

  async isCurrentPage() {
    return await this.page.url() === this.url;
   
  }

  async continue() {
    await this.page.click("#continue");
  }

  async ukPassportChoice(){
    await this.page.click("#photoIdChoice");
  }

  async drivingLicenceChoice(){
    await this.page.click("#photoIdChoice-ukPhotocardDL");
  }

  async brpChoice(){
    await this.page.click("#photoIdChoice-brp");
  }

  async nonUKPassportChoice(){
    await this.page.click("#photoIdChoice-otherPassport");
  }

  async citizenCardChoice(){
    await this.page.click("#photoIdChoice-citizenCard");
  }
};
