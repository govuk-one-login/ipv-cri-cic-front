module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/enter-date-birth";
    this.pathNoPhotoId = "/enter-date-birth-no-photo-id";
    this.pathNoLowConfidence = "/enter-date-birth-hmrc-check";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async isCurrentPageNoPhotoID() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.pathNoPhotoId;
  }

  async isCurrentPageLowConfidence() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.pathNoLowConfidence;
  }

  async continue() {
    await this.page.getByTestId("enter-dob-continue-btn").click();
  }

  async back() {
    await this.page.click("#back");
  }

  async dateOfBirth(userData) {
    const dob = String(userData.dob).replace(/['"]/g, "").trim();
    const [year, month, day] = dob.split("-");

    await this.page.locator("#dateOfBirth-day").fill(day);
    await this.page.locator("#dateOfBirth-month").fill(month);
    await this.page.locator("#dateOfBirth-year").fill(year);
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator(".govuk-error-summary__title")
      .textContent();
    return errorText.trim();
  }
};
