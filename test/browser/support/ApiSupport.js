const axios = require("axios");
const { expect } = require("chai");

module.exports = class ApiSupport {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async generateTokenPostRequest() {
    return await axios.post(
      process.env.IPV_STUB_URL + "generate-token-request",
    );
  }

  async tokenPostRequest(authorizationCode, redirectUri, clientAssertionJwt) {
    return await axios.post(
      this.baseUrl + "/token",
      `code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=${clientAssertionJwt}`,
      { headers: { "Content-Type": "text/plain" } },
    );
  }

  async userInfoPostRequest(accessToken) {
    return await axios.post(this.baseUrl + "/userinfo", null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  async getCicSessionId() {
    return this.sessionId;
  }

  async getJwtTokenUserInfo(responseString) {
    try {
      const matches = responseString.match(/\[(.*?)\]/g);
      const result = [];
      if (matches) {
        for (let i = 0; i < matches.length; ++i) {
          const match = matches[i];
          result.push(match.substring(1, match.length - 1));
        }
      }
      return JSON.stringify(result)
        .replace(/['"]+/g, "")
        .replace(/\\/g, "")
        .replace(/[[\]]/g, "");
    } catch (error) {
      console.log(
        `Error response getting JWT Token from /userInfo endpoint: ${error}`,
      );
      return error.response;
    }
  }

  async validateJwtToken(jwtToken) {
    const userData = require("../support/cicUserData.json");
    const jwtArray = JSON.stringify(jwtToken).split(".");
    const rawHead = jwtArray[0];
    const rawBody = jwtArray[1];
    let decodeRawHead = Buffer.from(rawHead, "base64");
    expect(JSON.parse(decodeRawHead).alg).to.equal("ES256");
    expect(JSON.parse(decodeRawHead).typ).to.equal("JWT");

    const decodeRawBody = Buffer.from(rawBody, "base64");
    expect(
      JSON.parse(decodeRawBody).vc.credentialSubject.name[0].nameParts[0].value,
    ).to.equal(userData.firstName);
    expect(
      JSON.parse(decodeRawBody).vc.credentialSubject.name[0].nameParts[1].value,
    ).to.equal(userData.middleName);
    expect(
      JSON.parse(decodeRawBody).vc.credentialSubject.name[0].nameParts[2].value,
    ).to.equal(userData.lastName);
    expect(
      JSON.parse(decodeRawBody).vc.credentialSubject.birthDate[0].value,
    ).to.equal(userData.dob);
  }
};
