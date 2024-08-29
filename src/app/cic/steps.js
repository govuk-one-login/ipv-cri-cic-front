const nameEntry = require("./controllers/nameEntry");
const dobEntry = require("./controllers/dateOfBirth");
const checkDetails = require("./controllers/checkDetails");
const root = require("./controllers/root");
const journeyType = require("./controllers/journeyType");

module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: "journey-type",
  },
  "/journey-type": {
    entryPoint: true,
    skip: true,
    controller: journeyType,
    next: [
      {
        field: "journeyType",
        value: "f2f",
        next: "enter-name",
      },
      {
        field: "journeyType",
        value: "bank_account",
        next: "enter-name-no-photo-id",
      },
      {
        field: "journeyType",
        value: "hmrc_check",
        next: "enter-name-hmrc-check",
      },
    ],
  },
  "/enter-name": {
    editable: true,
    editBackStep: "confirm-details",
    fields: ["surname", "firstName", "middleName"],
    controller: nameEntry,
    next: "enter-date-birth",
  },
  "/enter-name-no-photo-id": {
    editable: true,
    editBackStep: "confirm-details-no-photo-id",
    fields: ["surname", "firstName", "middleName"],
    controller: nameEntry,
    next: "enter-date-birth-no-photo-id",
  },
  "/enter-name-hmrc-check": {
    editable: true,
    editBackStep: "confirm-details-hmrc-check",
    fields: ["surname", "firstName", "middleName"],
    controller: nameEntry,
    next: "enter-date-birth-hmrc-check",
  },
  "/enter-date-birth": {
    editable: true,
    editBackStep: "confirm-details",
    fields: ["dateOfBirth"],
    controller: dobEntry,
    next: "confirm-details",
  },
  "/enter-date-birth-no-photo-id": {
    editable: true,
    editBackStep: "confirm-details-no-photo-id",
    fields: ["dateOfBirth"],
    controller: dobEntry,
    next: "confirm-details-no-photo-id",
  },
  "/enter-date-birth-hmrc-check": {
    editable: true,
    editBackStep: "confirm-details-hmrc-check",
    fields: ["dateOfBirth"],
    controller: dobEntry,
    next: "confirm-details-hmrc-check",
  },
  "/confirm-details": {
    controller: checkDetails,
    next: "done",
  },
  "/confirm-details-no-photo-id": {
    controller: checkDetails,
    next: "done",
  },
  "/confirm-details-hmrc-check": {
    controller: checkDetails,
    next: "done",
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },
  "/error": {
    entryPoint: true,
  },
};
