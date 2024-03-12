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

    console.log("Caitlin: CUSTOM_FE_URL", process.env.CUSTOM_FE_URL);
    console.log("Caitlin: IPV_STUB_URL length", process.env.IPV_STUB_URL.length);

    if (process.env.CUSTOM_FE_URL)
      claim.frontendURL = process.env.CUSTOM_FE_URL;

    const postRequest = await axios.post(process.env.IPV_STUB_URL, claim);

    console.log("Caitlin: postRequest.data.AuthorizeLocation", postRequest.data.AuthorizeLocation);

    await this.page.goto(postRequest.data.AuthorizeLocation);
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
