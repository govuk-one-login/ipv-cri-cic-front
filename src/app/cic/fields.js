const { APP } = require("../../lib/config");

module.exports = {
  photoIdChoice: {
    type: "radios",
    legend: "",
    label: "",
    hint: "",
    items: [
      {
        value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
        hint: { text: APP.UK_PASSPORT_HINT }
      },
      { value: APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT },
      { value: APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL },
      { value: APP.PHOTO_ID_OPTIONS.BRP },
      { value: APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL },
      { value: APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD },
      { value: APP.PHOTO_ID_OPTIONS.CITIZEN_CARD },
      { value: APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD },
      { divider: "or" },
      { value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID }
    ],
    validate: ["required"]
  },
  passportExpiryDate: {
    type: "date",
    journeyKey: "passportExpiryDate",
    validate: ["required", "date",
      {
        type: "before",
        arguments: [
          new Date(
            new Date().getFullYear() + 10,
            new Date().getMonth(),
            new Date().getDate() + 1,
          )
            .toISOString()
            .split("T")[0],
        ],
      },
    ]
  },
  nonUKPassportExpiryDate: {
    type: "date",
    journeyKey: "nonUKPassportExpiryDate",
    validate: ["required", "date"]
  },
  photocardDlExpiryDate: {
    type: "date",
    journeyKey: "passportExpiryDate",
    validate: ["required", "date",
      {
        type: "before",
        arguments: [
          new Date(
            new Date().getFullYear() + 10,
            new Date().getMonth(),
            new Date().getDate() + 1,
          )
            .toISOString()
            .split("T")[0],
        ],
      },
    ]
  },
  brpExpiryDate: {
    type: "date",
    journeyKey: "brpExpiryDate",
    validate: ["required", "date"]
  },
  euPhotocardDlExpiryDate: {
    type: "date",
    journeyKey: "euPhotocardDlDate",
    validate: ["required", "date"]
  },
  citizenCardExpiryDate: {
    type: "date",
    journeyKey: "citizenCardExpiryDate",
    validate: [
      "required", "date"]
  },
  youngScotNationalEntitlementCardExpiryDate: {
    type: "date",
    journeyKey: "youngScotNationalEntitlementCardExpiryDate",
    validate: [
      "required", "date"]
  },
  euIdCardExpiryDate: {
    type: "date",
    journeyKey: "euIdCardExpiryDate",
    validate: [
      "required", "date"]
  },
  surname: {
    type: "text",
    journeyKey: "surname",
    validate: [
      "required",
      {type: "regexName", fn: (value) => value.match(/^[a-zA-Z .'-]*$/)}
    ]
  },
  firstName: {
    type: "text",
    journeyKey: "firstName",
    validate: [
      "required",
      {type: "regexName", fn: (value) => value.match(/^[a-zA-Z .'-]*$/)}
    ]
  },
  middleName: {
    type: "text",
    journeyKey: "middleName",
    validate: [
      {type: "regexName", fn: (value) => value.match(/^[a-zA-Z .'-]*$/)}
    ]
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required", "date",
      { type: "before", arguments: [new Date().toISOString().split("T")[0]] },
      { type: "after", arguments: ["1904-02-12"] }
    ]
  }
};
