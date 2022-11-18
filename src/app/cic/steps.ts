import {LandingPageController} from "./controllers/landingPage";
import {RootController} from "./controllers/root";
export const JOURNEYS= {

  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    controller: RootController,
    next: "landingPage",
  },
  "/landingPage": {

    next: "photoIdSelection",
  },
  "/photoIdSelection": {
    controller: LandingPageController,
    fields: ['photoIdChoice'],
    next: LandingPageController.prototype.next
  },

  "/passportDetails": {
    fields: ["expiryDate"],
    next: "done"
  },

  '/done': {
    backLink: null,
    noPost: true
  }
};
