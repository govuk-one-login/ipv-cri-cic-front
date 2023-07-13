module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */


  constructor(page) {
    this.page = page;
    this.path = "/checkDetails";
    this.sessionState;
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#continue");

  }

  async setSessionState() {
    const url = JSON.stringify(new URL(await this.page.url())).split("state=")
    return url[1];
  }


  async back(){
    await this.page.click("#back");
  }

  async changeExpiryDate(){
    await this.expiryDateLink.click();
  }

  async changeIdType(){
    await this.idTypeLink.click();
  }

  get nameEntryLink() {
    return this.page.locator('[href*="/nameEntry/edit"]')
  }

  async changeName(){
    await this.nameEntryLink.click();
  }

  get doBLink() {
    return this.page.locator('[href*="/dateOfBirth/edit"]')
  }

  async changeDoB(){
    await this.doBLink.click();
  }
};
