require("dotenv").config();

module.exports = {
  API: {
    BASE_URL:
      process.env.API_BASE_URL ||
      "https://api-cic-cri-api-ccooling.review-c.dev.account.gov.uk",
    PATHS: {
      SESSION: "/session",
      AUTHORIZATION: "/authorization",
      SAVE_CICDATA: "/claimedIdentity",
      SESSION_CONFIG: "/session-config",
    },
  },
  APP: {
    BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:8000",
    PATHS: {
      CIC: "/",
      NAME_ENTRY: "/enter-name",
      DATE_OF_BIRTH: "/enter-date-birth",
      CHECK_DETAILS: "/confirm-details",
    },
    GTM: {
      GA4_ID: process.env.GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID || "GTM-XXXXXXX",
      UA_ID: process.env.UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID || "UA-XXXXXXX",
      ANALYTICS_COOKIE_DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
      GA4_DISABLED: process.env.GA4_DISABLED || false,
      UA_DISABLED: process.env.UA_DISABLED || true,
    },
  },
  PORT: process.env.PORT || 5020,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  SESSION_TTL: process.env.SESSION_TTL || 7200000, // two hours in ms
  REDIS: {
    SESSION_URL: process.env.REDIS_SESSION_URL,
    PORT: process.env.REDIS_PORT || 6379,
  },
};
