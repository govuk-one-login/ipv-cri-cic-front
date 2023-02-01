const photoIdSelect = require("./controllers/photoIdSelection");
const passportDetails = require("./controllers/passportDetails");
const nonUKPassportDetails = require('./controllers/nonUKPassportDetails')
const brpDetails = require("./controllers/brpDetails");
const photocardDlDetails = require('./controllers/photocardDl');
const eeaPermanentResidencyCard = require("./controllers/eeaPermanentResidencyCardDetails");
const euPhotocardDlDetails = require('./controllers/euPhotocardDlDetails')
const citizenCardDetails = require("./controllers/citizenCardDetails");
const euIdentityCardDetails = require("./controllers/euIdentityCardDetails");
const youngScotNationalEntitlementCardDetails = require('./controllers/youngScotNationalEntitlementCardDetails');
const nameEntry = require("./controllers/nameEntry");
const dobEntry = require("./controllers/dateOfBirth");
const checkDetails = require('./controllers/checkDetails');
const root = require("./controllers/root");

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
    fields: ['photoIdChoice'],
    controller: photoIdSelect,
    editable: true,
    editBackStep: "checkDetails",
    invalidates: [
      "photoIdSelection",
      "brpExpiryDate",
      "citizenCardExpiryDate",
      "eeaPrCardExpiryDate",
      "euIdCardExpiryDate",
      "euPhotocardDlExpiryDate",
      "nonUKPassportExpiryDate",
      "passportExpiryDate",
      "photocardDlExpiryDate",
      "youngScotNationalEntitlementCardExpiryDate"
    ],
    next: photoIdSelection.prototype.next
  },
  "/passportDetails": {
    fields: ["passportExpiryDate"],
    controller: passportDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: passportDetails.prototype.next
  },
  "/nonUKPassportDetails": {
    fields: ["nonUKPassportExpiryDate"],
    controller: nonUKPassportDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: passportDetails.prototype.next
  },
  "/photocardDlDetails": {
    fields: ["photocardDlExpiryDate"],
    controller: photocardDlDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: photocardDlDetails.prototype.next
  },
  "/brpDetails": {
    fields: ["brpExpiryDate"],
    controller: brpDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: brpDetails.prototype.next
  },
  "/euIdentityCardDetails": {
    fields: ["euIdCardExpiryDate"],
    controller: euIdentityCardDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: euIdentityCardDetails.prototype.next
  },
  "/youngScotNecDetails": {
    fields: ["youngScotNationalEntitlementCardExpiryDate"],
    controller: youngScotNationalEntitlementCardDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: youngScotNationalEntitlementCardDetails.prototype.next
  },
  "/citizenCardDetails": {
    fields: ["citizenCardExpiryDate"],
    controller: citizenCardDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: citizenCardDetails.prototype.next
  },
  "/eeaPermanentResidencyCardDetails": {
    fields: ["eeaPrCardExpiryDate"],
    controller: eeaPermanentResidencyCard,
    editable: true,
    editBackStep: "checkDetails",
    next: eeaPermanentResidencyCard.prototype.next
  },
  "/euPhotocardDlDetails": {
    fields: ["euPhotocardDlExpiryDate"],
    controller: euPhotocardDlDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: euPhotocardDlDetails.prototype.next
  },
  '/photoIdExpiry': {
    next: "/photoIdSelection"
  },
  "/nameEntry": {
    fields: ["surname", "firstName", "middleName"],
    controller: nameEntry,
    editable: true,
    editBackStep: "checkDetails",
    next: nameEntry.prototype.next
  },
  "/dateOfBirth": {
    fields: ["dateOfBirth"],
    controller: dobEntry,
    editable: true,
    editBackStep: "checkDetails",
    next: dobEntry.prototype.next
  },
  "/checkDetails": {
    controller: checkDetails,
    next: checkDetails.prototype.next
  },
  '/done': {

  },

};
