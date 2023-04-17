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
    next: "nameEntry",
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
