import dotenv from "dotenv";
import express from "express";

//require("express-async-errors");
const session = require("express-session");
import AWS from "aws-sdk";
import dynamodb from "connect-dynamodb"
import { CONFIG } from "./lib/config";
import { getGTM } from "./lib/locals"
const DynamoDBStore = dynamodb(session);
const { setup } = require("hmpo-app");

var sessionStore;

dotenv.config();

if (process.env.NODE_ENV !== "local") {
  AWS.config.update({
    region: "eu-west-2",
  });
  const dynamodb = new AWS.DynamoDB();

  sessionStore = new DynamoDBStore({
    client: dynamodb,
    table: CONFIG.SESSION_TABLE_NAME,
  });
}

const loggerConfig = {
  console: true,
  consoleJSON: true,
  app: false,
  requestMeta: {
    cicSessionId: "session.cicSessionId",
  },
  meta: {
    cicSessionId: "session.cicSessionId",
  },
};

const sessionConfig = {
  cookieName: "cic_service_session",
  secret: CONFIG.SESSION_SECRET,
  sessionStore: sessionStore,
};

const { router } = setup({
  config: { APP_ROOT: __dirname },
  port: CONFIG.PORT,
  logs: loggerConfig,
  session: sessionConfig,
  redis: !sessionStore,
  urls: {
    public: "/public",
  },
  publicDirs: ["../dist/public"],
  translation: {
    allowedLangs: ["en"],
    fallbackLang: ["en"],
    cookie: { name: "lng" },
  },
  dev: true,
  middlewareSetupFn: (app: any) => {
    app.use(function (req: any, res: any, next: any) {
      req.headers["x-forwarded-proto"] = "https";
      next();
    });
  },
});

router.use(getGTM);
router.use("/oauth2", require("./app/oauth2/router"));
router.use("/cic", require("./app/cic/router"));
