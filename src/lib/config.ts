import dotenv from "dotenv"
const cfenv = require("cfenv");

dotenv.config();
const appEnv = cfenv.getAppEnv();
const serviceConfig = {};

if (!appEnv.isLocal) {
  // @ts-ignore
  serviceConfig.cicBackAPIUrl = appEnv.getServiceURL(
    "cic-back-api"
  );
}

export const CONFIG = {
  // @ts-ignore
  API_BASE_URL: serviceConfig.cicBackAPIUrl || process.env.API_BASE_URL,
  API_BUILD_CLIENT_OAUTH_RESPONSE_PATH: "/build-client-oauth-response",
  API_INITIALISE_SESSION_REQ_PATH: "/initialise-session",
  PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  GTM_ID: process.env.GTM_ID,
  GTM_ANALYTICS_COOKIE_DOMAIN: process.env.ANALYTICS_DOMAIN,
};
