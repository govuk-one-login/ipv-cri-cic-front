import {RootController} from "./controllers/root";
import {PhotoIdSelectionController} from "./controllers/photoIdSelection";
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
    controller: PhotoIdSelectionController,
    fields: ['photoIdChoice'],
    next: PhotoIdSelectionController.prototype.next
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
