module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/enter-date-birth";
    this.pathNoPhotoId = "/enter-date-birth-no-photo-id";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async isCurrentPageNoPhotoID() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.pathNoPhotoId;
  }

  async continue() {
    await this.page.getByTestId("enter-dob-continue-btn").click();
  }

  async back() {
    await this.page.click("#back");
  }

  async dateOfBirth(userData) {
    const dobArray = JSON.stringify(userData.dob).split("-");
    await this.page.locator("#dateOfBirth-day").fill(dobArray[2]);
    await this.page.locator("#dateOfBirth-month").fill(dobArray[1]);
    await this.page
      .locator("#dateOfBirth-year")
      .fill(dobArray[0].replace(/['"]+/g, ""));
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator(".govuk-error-summary__title")
      .textContent();
    return errorText.trim();
  }
};
