const axios = require("axios");
const aws4Interceptor = require("aws4-axios").aws4Interceptor;
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { fromNodeProviderChain } = require("@aws-sdk/credential-providers");

module.exports = class TestHarness {
  constructor() {
    console.log("Caitlin: TEST_HARNESS_URL", process.env.TEST_HARNESS_URL);
    this.HARNESS_API_INSTANCE = axios.create({
      baseURL: process.env["TEST_HARNESS_URL"],
    });
    const customCredentialsProvider = {
      getCredentials: fromNodeProviderChain({
        timeout: 1000,
        maxRetries: 0,
      }),
    };
    const awsSigv4Interceptor = aws4Interceptor({
      options: {
        region: "eu-west-2",
        service: "execute-api",
      },
      credentials: customCredentialsProvider,
    });

    this.HARNESS_API_INSTANCE.interceptors.request.use(awsSigv4Interceptor);
  }

  async getSession(sessionId) {
    console.log("Caitlin: getSession")
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get(
        "/getRecordBySessionId/" +
          process.env["SESSION_TABLE"] +
          "/" +
          sessionId,
      );
      return unmarshall(getItemResponse.data.Item);
    } catch (error) {
      console.log("Caitlin: getSession error", error)
      return error;
    }
  }

  async getSessionByAuthCode(authCode) {
    console.log("Caitlin: getSessionByAuthCode")

    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get(
        "getSessionByAuthCode/" + process.env["SESSION_TABLE"] + "/" + authCode,
        {},
      );
      return unmarshall(getItemResponse.data.Items[0]);
    } catch (error) {
      console.log("Caitlin: getSessionByAuthCode error", error)

      return error;
    }
  }
};
