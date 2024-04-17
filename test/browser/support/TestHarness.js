const CIC_CRI_AUTH_CODE_ISSUED_SCHEMA = require("../support/CIC_CRI_AUTH_CODE_ISSUED_SCHEMA.json");
const CIC_CRI_END_SCHEMA = require("../support/CIC_CRI_END_SCHEMA.json");
const CIC_CRI_START_BANK_ACCOUNT_SCHEMA = require("../support/CIC_CRI_START_BANK_ACCOUNT_SCHEMA.json");
const CIC_CRI_START_SCHEMA = require("../support/CIC_CRI_START_SCHEMA.json");
const CIC_CRI_VC_ISSUED_SCHEMA = require("../support/CIC_CRI_VC_ISSUED_SCHEMA.json");
const axios = require("axios");
const aws4Interceptor = require("aws4-axios").aws4Interceptor;
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { fromNodeProviderChain } = require("@aws-sdk/credential-providers");
const { XMLParser } = require("fast-xml-parser");
const { expect } = require("chai");

module.exports = class TestHarness {
  constructor() {
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
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get(
        "/getRecordBySessionId/" +
        process.env["SESSION_TABLE"] +
        "/" +
        sessionId,
      );
      return unmarshall(getItemResponse.data.Item);
    } catch (error) {
      return error;
    }
  }

  async getSessionByAuthCode(authCode) {
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get(
        "getSessionByAuthCode/" + process.env["SESSION_TABLE"] + "/" + authCode,
        {},
      );
      return unmarshall(getItemResponse.data.Items[0]);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getSqsEventList(folder, prefix, txmaEventSize) {
    let keys;
    let keyList;
    let i;
    do {
      const listObjectsResponse = await this.HARNESS_API_INSTANCE.get(
        "/bucket/",
        {
          params: {
            prefix: folder + prefix,
          },
        }
      );
      const xmlParser = new XMLParser();
      const listObjectsParsedResponse = xmlParser.parse(
        listObjectsResponse.data
      );
      if (!listObjectsParsedResponse?.ListBucketResult?.Contents) {
        return undefined;
      }
      keys = listObjectsParsedResponse?.ListBucketResult?.Contents;
      console.log(listObjectsParsedResponse?.ListBucketResult?.Contents);
      keyList = [];
      for (i = 0; i < keys.length; i++) {
        keyList.push(
          listObjectsParsedResponse?.ListBucketResult?.Contents.at(i).Key
        );
      }
    } while (keys.length < txmaEventSize);
    return keyList;
  }

  async getTxMAEventData(keyList) {
    let obj = {};
    let i;
    for (i = 0; i < keyList.length; i++) {
      const txmaEventBody = await this.HARNESS_API_INSTANCE.get(
        "/object/" + keyList[i],
        {}
      );
      console.log(JSON.stringify(txmaEventBody.data, null, 2));
      const eventName = txmaEventBody.data.event_name;
      obj[eventName] = txmaEventBody.data;
    }
    return obj;
  }

  async validateTxMAEventData(allTxmaEventBodies, eventName, schemaName) {
    const Ajv = require("ajv").default;
    const AjvFormats = require("ajv-formats");
    const ajv = new Ajv({ strictTuples: false });
    ajv.addSchema(CIC_CRI_AUTH_CODE_ISSUED_SCHEMA, "CIC_CRI_AUTH_CODE_ISSUED_SCHEMA");
    ajv.addSchema(CIC_CRI_END_SCHEMA, "CIC_CRI_END_SCHEMA");
    ajv.addSchema(CIC_CRI_START_BANK_ACCOUNT_SCHEMA, "CIC_CRI_START_BANK_ACCOUNT_SCHEMA");
    ajv.addSchema(CIC_CRI_START_SCHEMA, "CIC_CRI_START_SCHEMA");
    ajv.addSchema(CIC_CRI_VC_ISSUED_SCHEMA, "CIC_CRI_VC_ISSUED_SCHEMA");
    AjvFormats(ajv);

    const currentEventBody = allTxmaEventBodies[eventName];

    if (currentEventBody?.event_name) {
      try {
        const validate = ajv.getSchema(schemaName);
        if (validate) {
          expect(validate(currentEventBody)).to.be.true;
        } else {
          throw new Error(`Could not find schema ${schemaName}`);
        }
      } catch (error) {
        console.error("Error validating event", error);
        throw error;
      }
    } else {
      throw new Error(`No event found in the test harness for ${eventName} event`);
    }
  }
};


