module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/photoIdSelection";
  }

  isCurrentPage() {
     console.log(">>In photoIdSelectionPage.js");
     console.log(">>In isCurrentPage function");

    return this.page.url() === this.url;
    console.log(url);
  }

  async continue() {
    // console.log(">>In photoIdSelectionPage.js");
    // console.log(">>In continue");
    await this.page.click("#continue");
  }

  async ukPassportChoice(){
    console.log(">>In passPortDetailsPage.js");
    console.log(">>In passportChoice function");
    await this.page.click("#photoIdChoice");
  }

  async drivingLicenceChoice(){
    console.log(">>In passPortDetailsPage.js");
    console.log(">>In drivingLicenceChoice function");
    await this.page.click("#photoIdChoice-ukPhotocardDL");
  }

  async brpChoice(){
    console.log(">>In passPortDetailsPage.js");
    console.log(">>In brpChoice function");
    await this.page.click("#photoIdChoice-brp");
  }

  async nonUKPassportChoice(){
    console.log(">>In passPortDetailsPage.js");
    console.log(">>In nonUKPassportChoice function");
    await this.page.click("#photoIdChoice-otherPassport");
  }
};
