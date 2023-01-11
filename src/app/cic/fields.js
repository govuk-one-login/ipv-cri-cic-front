const {APP} = require("../../lib/config");

module.exports = {
  photoIdChoice: {
    type: "radios",
    legend: "",
    label: "",
    hint: "",
    items: [{
      value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
      hint: {text: APP.UK_PASSPORT_HINT}
    }, APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL, APP.PHOTO_ID_OPTIONS.BRP,
    {
      value: APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT,
      hint: {text: APP.NON_UK_PASSPORT_HINT}
    }, 
      APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD,
    ],
    validate: ["required"]
  },
  passportExpiryDate: {
    type: "date",
    journeyKey: "passportExpiryDate",
    validate: ["required", "date"],
  },
  nonUKPassportExpiryDate: {
    type: "date",
    journeyKey: "nonUKPassportExpiryDate",
    validate: ["required", "date"],
  },
  photocardDlExpiryDate: {
    type: "date",
    journeyKey: "photocardDlExpiryDate",
    validate: ["required", "date"]
  },
  brpExpiryDate: {
    type: "date",
    journeyKey: "brpExpiryDate",
    validate: ["required", "date"]
  },
  youngScotNationalEntitlementCardExpiryDate: {
    type: "date",
    journeyKey: "youngScotNationalEntitlementCardExpiryDate",
    validate: ["required", "date"]
  },
  surname: {
    type: "text",
    journeyKey: "surname",
    validate: [
      "required",
      {type: "regexSurname", fn: (value) => value.match(/^[a-zA-Z .'-]*$/)}
    ]
  },
  firstName: {
    type: "text",
    journeyKey: "firstName",
    validate: [
      "required",
      {type: "regexSurname", fn: (value) => value.match(/^[a-zA-Z .'-]*$/)}
    ]
  },
  middleName: {
    type: "text",
    journeyKey: "middleName",
    validate: [
      {type: "regexSurname", fn: (value) => value.match(/^[a-zA-Z .'-]*$/)}
    ]
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required", "date",
      {type: "before", arguments: [new Date().toISOString().split("T")[0]]},
    ]
  }
};
