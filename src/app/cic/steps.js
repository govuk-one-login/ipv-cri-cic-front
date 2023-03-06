const photoIdSelect = require("./controllers/photoIdSelection");
const passportDetails = require("./controllers/passportDetails");
const nonUKPassportDetails = require('./controllers/nonUKPassportDetails')
const brpDetails = require("./controllers/brpDetails");
const photocardDlDetails = require('./controllers/photocardDl');
const euPhotocardDlDetails = require('./controllers/euPhotocardDlDetails')
const citizenCardDetails = require("./controllers/citizenCardDetails");
const euIdentityCardDetails = require("./controllers/euIdentityCardDetails");
const youngScotNationalEntitlementCardDetails = require('./controllers/youngScotNationalEntitlementCardDetails');
const nameEntry = require("./controllers/nameEntry");
const dobEntry = require("./controllers/dateOfBirth");
const checkDetails = require('./controllers/checkDetails');
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
      "nonUKPassportExpiryDate",
      "photocardDlExpiryDate",
      "brpExpiryDate",
      "euIdCardExpiryDate",
      "youngScotNationalEntitlementCardExpiryDate",
      "citizenCardExpiryDate",
      "euPhotocardDlExpiryDate",
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
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID,
        next: APP.PATHS.NO_PHOTO_ID,
      },
    ],
  },

  "/passportDetails": {
    fields: ["passportExpiryDate"],
    controller: passportDetails,
    editable: true,
    editBackStep: "checkDetails",
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
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "nonUKPassportExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      {
        field: "nonUKPassportExpiryDate",
        op: "after",
        value: "75 years",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/photocardDlDetails": {
    fields: ["photocardDlExpiryDate"],
    controller: photocardDlDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "photocardDlExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/brpDetails": {
    fields: ["brpExpiryDate"],
    controller: brpDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "brpExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/euIdentityCardDetails": {
    fields: ["euIdCardExpiryDate"],
    controller: euIdentityCardDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "euIdCardExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      {
        field: "euIdCardExpiryDate",
        op: "after",
        value: "75 years",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/youngScotNecDetails": {
    fields: ["youngScotNationalEntitlementCardExpiryDate"],
    controller: youngScotNationalEntitlementCardDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "youngScotNationalEntitlementCardExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/citizenCardDetails": {
    fields: ["citizenCardExpiryDate"],
    controller: citizenCardDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "citizenCardExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      {
        field: "citizenCardExpiryDate",
        op: "after",
        value: "4 years",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/euPhotocardDlDetails": {
    fields: ["euPhotocardDlExpiryDate"],
    controller: euPhotocardDlDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "euPhotocardDlExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      {
        field: "euPhotocardDlExpiryDate",
        op: "after",
        value: "75 years",
        next: "photoIdExpiry",
      },
      "nameEntry",
    ],
  },
  "/photoIdExpiry": {
    next: "photoIdSelection",
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
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },

};
