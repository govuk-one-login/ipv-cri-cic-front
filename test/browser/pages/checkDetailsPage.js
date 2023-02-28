module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5020/checkDetails";
  }

  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async back(){
    await this.page.click("#back");
  }

  get expiryDateLink() {
    return this.page.locator('[href*="/nonUKPassportDetails/edit"]');
  }
  
  async changeExpiryDate(){
    await this.expiryDateLink.click();
  }

  get idTypeLink() {
    return this.page.locator('[href*="/photoIdSelection/edit"]');
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
