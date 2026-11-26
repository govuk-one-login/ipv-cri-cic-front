import { RootController } from "./controllers/root.js";
import { JourneyTypeController } from "./controllers/journeyType.js";
import { NameEntryController } from "./controllers/nameEntry.js";
import { DateOfBirthController } from "./controllers/dateOfBirth.js";
import { CheckDetailsController } from "./controllers/checkDetails.js";

export const steps = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: RootController,
    next: "journey-type",
  },
  "/journey-type": {
    entryPoint: true,
    skip: true,
    controller: JourneyTypeController,
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
    controller: NameEntryController,
    next: "enter-date-birth",
  },
  "/enter-name-no-photo-id": {
    editable: true,
    editBackStep: "confirm-details-no-photo-id",
    fields: ["surname", "firstName", "middleName"],
    controller: NameEntryController,
    next: "enter-date-birth-no-photo-id",
  },
  "/enter-name-hmrc-check": {
    editable: true,
    editBackStep: "confirm-details-hmrc-check",
    fields: ["surname", "firstName", "middleName"],
    controller: NameEntryController,
    next: "enter-date-birth-hmrc-check",
  },
  "/enter-date-birth": {
    editable: true,
    editBackStep: "confirm-details",
    fields: ["dateOfBirth"],
    controller: DateOfBirthController,
    next: "confirm-details",
  },
  "/enter-date-birth-no-photo-id": {
    editable: true,
    editBackStep: "confirm-details-no-photo-id",
    fields: ["dateOfBirth"],
    controller: DateOfBirthController,
    next: "confirm-details-no-photo-id",
  },
  "/enter-date-birth-hmrc-check": {
    editable: true,
    editBackStep: "confirm-details-hmrc-check",
    fields: ["dateOfBirth"],
    controller: DateOfBirthController,
    next: "confirm-details-hmrc-check",
  },
  "/confirm-details": {
    controller: CheckDetailsController,
    next: "done",
  },
  "/confirm-details-no-photo-id": {
    controller: CheckDetailsController,
    next: "done",
  },
  "/confirm-details-hmrc-check": {
    controller: CheckDetailsController,
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
