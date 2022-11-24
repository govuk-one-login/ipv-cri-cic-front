const photoIdSelect = require("./controllers/photoIdSelection");
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
    controller: details,
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
