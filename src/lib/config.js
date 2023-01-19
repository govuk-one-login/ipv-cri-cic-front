require("dotenv").config();

module.exports = {
  API: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:8090",
    PATHS: {
      SESSION: "/session",
      QUESTION: "/question",
      ANSWER: "/answer",
      AUTHORIZATION: "/authorization",
      ABANDON: "/abandon",
    },
  },
  APP: {
    BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:8000",
    PATHS: {
      CIC: "/",
      PASSPORT_DETAILS: "/passportDetails",
      NON_UK_PASSPORT_DETAILS: "/nonUKPassportDetails",
      PHOTOCARD_DL_DETAILS: "/photocardDlDetails",
      BRP_DETAILS: "/brpDetails",
      EU_PHOTOCARD_DL_DETAILS: "/euPhotocardDlDetails",
      EEA_PERMANENT_RESIDENCY_CARD_DETAILS: "/eeaPermanentResidencyCardDetails",
      EU_IDENTITY_CARD_DETAILS: "/euIdentityCardDetails",
      CITIZEN_CARD_DETAILS: "/citizenCardDetails",
      YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD_DETAILS: "/youngScotNecDetails",
      NAME_ENTRY: "/nameEntry",
      DATE_OF_BIRTH: "/dateOfBirth",
      CHECK_DETAILS: "/checkDetails",
    },
    PHOTO_ID_OPTIONS:{
      UK_PASSPORT:"ukPassport",
      OTHER_PASSPORT: "otherPassport",
      UK_PHOTOCARD_DL: "ukPhotocardDl",
      BRP: "brp",
      EU_PHOTOCARD_DL: "euPhotocardDl",
      EEA_PERMANENT_RESIDENCY_CARD: "eeaPermanentResidencyCard",
      EU_IDENTITY_CARD: "euIdentityCard",
      CITIZEN_CARD: "citizenCard",
      YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD: "youngScotNationalEntitlementCard"
    },
    UK_PASSPORT_HINT: "If your UK passport has expired, you can still use it to prove your identity up to 18 months after the expiry date",
    ANALYTICS: {
      ID: process.env.GTM_ID,
      DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
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
