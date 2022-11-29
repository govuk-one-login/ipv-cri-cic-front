const photoIdSelect = require("./controllers/photoIdSelection");
const passportDetails = require("./controllers/passportDetails");
const brpDetails = require("./controllers/brpDetails");
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
    next: "done"
  },
  "/photocardDlDetails": {
    fields: ["expiryDate"],
    next: "done"
  },
  "/otherPassport": {
    fields: ["expiryDate"],
    next: "done"
  },
  '/photoIdExpiry': {

    next: "/photoIdSelection"
  },
  '/done': {

  },

};
