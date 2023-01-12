const photoIdSelect = require("./controllers/photoIdSelection");
const passportDetails = require("./controllers/passportDetails");
const nonUKPassportDetails = require('./controllers/nonUKPassportDetails')
const brpDetails = require("./controllers/brpDetails");
const photocardDlDetails = require('./controllers/photocardDl');
const nameEntry = require("./controllers/nameEntry");
const dobEntry = require("./controllers/dateOfBirth");
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
    controller: photoIdSelect,
    fields: ['photoIdChoice'],
    next: photoIdSelect.prototype.next
  },

  "/passportDetails": {
    fields: ["passportExpiryDate"],
    controller: passportDetails,
    next: passportDetails.prototype.next
  },
  "/nonUKPassportDetails": {
    fields: ["nonUKPassportExpiryDate"],
    controller: nonUKPassportDetails,
    next: passportDetails.prototype.next
  },
  "/photocardDlDetails": {
    fields: ["photocardDlExpiryDate"],
    controller: photocardDlDetails,
    next: photocardDlDetails.prototype.next
  },
  "/brpDetails": {
    fields: ["brpExpiryDate"],
    controller: brpDetails,
    next: brpDetails.prototype.next
  },
  "/euPhotocardDlDetails": {
    next: 'done'
  },
  "/eeaPermanentResidencyCardDetails": {
    next: 'done'
  },
  "/euIdentityCardDetails": {
    next: 'done'
  },
  "/citizenCardDetails": {
    next: 'done'
  },
  "/youngScotNationalEntitlementCardDetails": {
    next: 'done'
  },
  '/photoIdExpiry': {

    next: "/photoIdSelection"
  },
  "/nameEntry": {
    fields: ["surname", "firstName", "middleName"],
    controller: nameEntry,
    next: nameEntry.prototype.next
  },
  "/dateOfBirth": {
    fields: ["dateOfBirth"],
    controller: dobEntry,
    next: dobEntry.prototype.next
  },
  "/checkDetails": {
    
    next: "/done",
  },
  '/done': {

  },

};
