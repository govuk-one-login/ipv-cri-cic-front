module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   *
   */

  constructor(page) {
    this.page = page;
  }

  async goto(claim) {
    const axios = require("axios");

    const postRequest = await axios.post(process.env.IPV_STUB_URL, claim);

    // await this.page.goto(postRequest.data.AuthorizeLocation);

		// Original URL from postRequest.data.AuthorizeLocation
		const originalUrl = postRequest.data.AuthorizeLocation;

		// Base URL to replace
		const oldBaseUrl = "https://cic-cri-front.review-c.dev.account.gov.uk";

		// New base URL
		const newBaseUrl = "https://frontend-985.review-c.dev.account.gov.uk";

		// Replace the old base URL with the new base URL
		const newUrl = originalUrl.replace(oldBaseUrl, newBaseUrl);

		// Use the new URL in the page.goto function
		await this.page.goto(newUrl);
  }

  isRelyingPartyServer() {
    return new URL(this.page.url()).origin === "http://example.net";
  }

  hasSuccessQueryParams() {
    const { searchParams } = new URL(this.page.url());

    return (
      searchParams.get("client_id") === "standalone" &&
      searchParams.get("state") === "sT@t3" &&
      searchParams.get("code") === "FACEFEED"
    );
  }

  hasErrorQueryParams() {
    const { searchParams } = new URL(this.page.url());

    return (
      searchParams.get("error") === "server_error" &&
      searchParams.get("error_description") === "gateway"
    );
  }
};
