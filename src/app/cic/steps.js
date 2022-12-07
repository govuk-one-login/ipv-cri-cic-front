const photoIdSelect = require("./controllers/photoIdSelection");
const passportDetails = require("./controllers/passportDetails");
const brpDetails = require("./controllers/brpDetails");
const nameEntry = require("./controllers/nameEntry");
const dobEntry = require("./controllers/dateOfBirth");
const nonUKPassportDetails = require('./controllers/nonUKPassportDetails')
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
  "/brpDetails": {
    fields: ["brpExpiryDate"],
    controller: brpDetails,
    next: brpDetails.prototype.next
  },
  "/photocardDlDetails": {
    fields: ["expiryDate"],
    next: "done"
  },
  "/nonUKPassportDetails": {
    fields: ["nonUKPassportExpiryDate"],
    controller: nonUKPassportDetails,
    next: passportDetails.prototype.next
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
  '/done': {

  },

};
