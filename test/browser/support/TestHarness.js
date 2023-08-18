const axios = require("axios");
const aws4Interceptor = require("aws4-axios").aws4Interceptor;
const { unmarshall } = require("@aws-sdk/util-dynamodb");

module.exports = class TestHarness {

  constructor() {
    this.HARNESS_API_INSTANCE = axios.create({baseURL: process.env['TEST_HARNESS_URL']});
    this.awsSigv4Interceptor = aws4Interceptor({
      options: {
        region: "eu-west-2",
        service: "execute-api",
      },
    });
    this.HARNESS_API_INSTANCE.interceptors.request.use(this.awsSigv4Interceptor);
  }

  async getSession(sessionId) {
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get("/getRecordBySessionId/"+ process.env["SESSION_TABLE"] +"/" + sessionId);
      return unmarshall(getItemResponse.data.Item);
    } catch (error) {
      return error;
    }
  }

  async getSessionByAuthCode(authCode) {
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get("/getSessionByAuthCode/"+ process.env["SESSION_TABLE"] +"/" + authCode);
      console.log(getItemResponse);
      console.log(getItemResponse.data);
      return unmarshall(getItemResponse.data.Items[0]);
    } catch (error) {
      return error;
    }
  }

}
