require("dotenv").config();

module.exports = {
  PACKAGE_NAME: "di-ipv-cri-cic-front",
  API: {
    BASE_URL:
      process.env.API_BASE_URL ||
      "https://api-cic-cri-api.review-c.dev.account.gov.uk",
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
      ANALYTICS_COOKIE_DOMAIN: process.env.FRONTEND_DOMAIN || "localhost",
      GA4_ENABLED: process.env.GA4_ENABLED || true,
      UA_ENABLED: process.env.UA_ENABLED || false,
      ANALYTICS_DATA_SENSITIVE: process.env.ANALYTICS_DATA_SENSITIVE || true,
      GA4_PAGE_VIEW_ENABLED: process.env.GA4_PAGE_VIEW_ENABLED || true,
      GA4_FORM_RESPONSE_ENABLED: process.env.GA4_FORM_RESPONSE_ENABLED || true,
      GA4_FORM_ERROR_ENABLED: process.env.GA4_FORM_ERROR_ENABLED || true,
      GA4_FORM_CHANGE_ENABLED: process.env.GA4_FORM_CHANGE_ENABLED || true,
      GA4_NAVIGATION_ENABLED: process.env.GA4_NAVIGATION_ENABLED || true,
      GA4_SELECT_CONTENT_ENABLED:
        process.env.GA4_SELECT_CONTENT_ENABLED || true,
    },
    LANGUAGE_TOGGLE_DISABLED: process.env.LANGUAGE_TOGGLE_DISABLED || "true",
    USE_DEVICE_INTELLIGENCE: process.env.DEVICE_INTELLIGENCE_ENABLED || "true",
    DEVICE_INTELLIGENCE_DOMAIN: process.env.FRONTEND_DOMAIN || "localhost",
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
