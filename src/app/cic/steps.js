const photoIdSelect = require("./controllers/photoIdSelection");
const passportDetails = require("./controllers/passportDetails");
const nonUKPassportDetails = require("./controllers/nonUKPassportDetails");
const brpDetails = require("./controllers/brpDetails");
const photocardDlDetails = require("./controllers/photocardDl");
const eeaPermanentResidencyCard = require("./controllers/eeaPermanentResidencyCardDetails");
const euPhotocardDlDetails = require("./controllers/euPhotocardDlDetails");
const citizenCardDetails = require("./controllers/citizenCardDetails");
const euIdentityCardDetails = require("./controllers/euIdentityCardDetails");
const youngScotNationalEntitlementCardDetails = require("./controllers/youngScotNationalEntitlementCardDetails");
const nameEntry = require("./controllers/nameEntry");
const dobEntry = require("./controllers/dateOfBirth");
const checkDetails = require("./controllers/checkDetails");
const root = require("./controllers/root");
const { APP } = require("../../lib/config");

module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: "landingPage",
  },
  "/landingPage": {
    next: "photoIdSelection",
  },
  "/photoIdSelection": {
    controller: photoIdSelect,
    editable: true,
    editBackStep: "checkDetails",
    fields: ["photoIdChoice"],
    invalidates: [
      "passportExpiryDate",
      "nonPassportExpiryDate",
      "photocardDLDetails",
      "passportExpiryDate",
      "passportExpiryDate",
      "dateOfBirth",
      "surname",
      "firstName",
      "middleName",
    ],
    next: [
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
        next: APP.PATHS.PASSPORT_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.BRP,
        next: APP.PATHS.BRP_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL,
        next: APP.PATHS.PHOTOCARD_DL_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT,
        next: APP.PATHS.NON_UK_PASSPORT_DETAILS,
      },

      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.EEA_PERMANENT_RESIDENCY_CARD,
        next: APP.PATHS.EEA_PERMANENT_RESIDENCY_CARD_DETAILS,
      },

      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL,
        next: APP.PATHS.EU_PHOTOCARD_DL_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.CITIZEN_CARD,
        next: APP.PATHS.CITIZEN_CARD_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD,
        next: APP.PATHS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD_DETAILS,
      },

      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD,
        next: APP.PATHS.EU_IDENTITY_CARD_DETAILS,
      },
    ],
  },

  "/passportDetails": {
    fields: ["passportExpiryDate"],
    controller: passportDetails,
    next: [
      {
        field: "passportExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/nonUKPassportDetails": {
    fields: ["nonUKPassportExpiryDate"],
    controller: nonUKPassportDetails,
    next: [
      {
        field: "nonUKPassportExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photoIdExpiry",
      },
      {
        field: "nonUKPassportExpiryDate",
        op: "before",
        value: "10 years ago",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/photocardDlDetails": {
    fields: ["photocardDlExpiryDate"],
    controller: photocardDlDetails,
    next: [
      {
        field: "photocardDlExpiryDate",
        op: "before",
        value: "10 years ago",
        next: "nameEntry",
      },
      "photoIdExpiry",
    ],
  },
  "/brpDetails": {
    fields: ["brpExpiryDate"],
    controller: brpDetails,
    next: [
      {
        field: "brpExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/euIdentityCardDetails": {
    fields: ["euIdCardExpiryDate"],
    controller: euIdentityCardDetails,
    next: [
      {
        field: "euIdCardExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/youngScotNecDetails": {
    fields: ["youngScotNationalEntitlementCardExpiryDate"],
    controller: youngScotNationalEntitlementCardDetails,
    next: [
      {
        field: "youngScotNationalEntitlementCardExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/citizenCardDetails": {
    fields: ["citizenCardExpiryDate"],
    controller: citizenCardDetails,
    next: [
      {
        field: "passportExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/eeaPermanentResidencyCardDetails": {
    fields: ["eeaPrCardExpiryDate"],
    controller: eeaPermanentResidencyCard,
    next: [
      {
        field: "passportExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/euPhotocardDlDetails": {
    fields: ["euPhotocardDlExpiryDate"],
    controller: euPhotocardDlDetails,
    next: [
      {
        field: "passportExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/photoIdExpiry": {
    // next: "/photoIdSelection",
  },
  "/nameEntry": {
    editable: true,
    editBackStep: "checkDetails",
    fields: ["surname", "firstName", "middleName"],
    controller: nameEntry,
    next: "dateOfBirth",
  },
  "/dateOfBirth": {
    editable: true,
    editBackStep: "checkDetails",
    fields: ["dateOfBirth"],
    controller: dobEntry,
    next: "checkDetails",
  },
  "/checkDetails": {
    controller: checkDetails,
    next: "done",
  },
  "/done": {},
};
