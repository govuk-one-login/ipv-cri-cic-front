import axios from "axios";
import assert from "node:assert";
import userData from "../support/cicUserData.json" with { type: "json" };

export class ApiSupport {
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
    const jwtArray = JSON.stringify(jwtToken).split(".");
    const rawHead = jwtArray[0];
    const rawBody = jwtArray[1];
    let decodeRawHead = Buffer.from(rawHead, "base64");
    assert.strictEqual(JSON.parse(decodeRawHead).alg, "ES256");
    assert.strictEqual(JSON.parse(decodeRawHead).typ, "JWT");

    const decodeRawBody = Buffer.from(rawBody, "base64");
    assert.strictEqual(
      JSON.parse(decodeRawBody).vc.credentialSubject.name[0].nameParts[0].value,
      userData.firstName,
    );
    assert.strictEqual(
      JSON.parse(decodeRawBody).vc.credentialSubject.name[0].nameParts[1].value,
      userData.middleName,
    );
    assert.strictEqual(
      JSON.parse(decodeRawBody).vc.credentialSubject.name[0].nameParts[2].value,
      userData.lastName,
    );
    assert.strictEqual(
      JSON.parse(decodeRawBody).vc.credentialSubject.birthDate[0].value,
      userData.dob,
    );
  }
}
