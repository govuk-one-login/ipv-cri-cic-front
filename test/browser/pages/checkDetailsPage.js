module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */


  constructor(page) {
    this.page = page;
    this.path = "/confirm-details";
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
    const url = await this.page.url().match(/state=([^&]*)/);
    return url[1];
  }

  async setAuthCode() {
    const url = await this.page.url().match(/code=([^&]*)/);
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
    return this.page.locator('[href*="/enter-name/edit"]')
  }

  async changeName(){
    await this.nameEntryLink.click();
  }

  get doBLink() {
    return this.page.locator('[href*="/enter-date-birth/edit"]')
  }

  async changeDoB(){
    await this.doBLink.click();
  }
  async checkWarning() {
    const warningText = await this.page.locator(".govuk-warning-text__assistive").textContent();
      return warningText.trim();
    }
};

