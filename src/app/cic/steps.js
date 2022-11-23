const photoIdSelect = require("./controllers/photoIdSelection");
const validate = require("./controllers/validate");
const details = require("./controllers/details");

module.exports = {

  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
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
    fields: ["expiryDate"],
    next: "done"
  },
  "/brpDetails": {
    fields: ["expiryDate"],
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
  '/done': {

  }
};
