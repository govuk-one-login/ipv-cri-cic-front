const { nameMaxLength } = require("./validators/customValidators");

module.exports = {
  surname: {
    type: "text",
    journeyKey: "surname",
    validate: [
      "required",
      { type: "minlength", arguments: 2 },
      { type: "nameMaxLength", fn: nameMaxLength, arguments: 40 },
      {
        type: "regexNumbersOrSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-z .'-]*$/),
      },
    ],
  },
  firstName: {
    type: "text",
    journeyKey: "firstName",
    validate: [
      "required",
      { type: "minlength", arguments: 2 },
      { type: "nameMaxLength", fn: nameMaxLength, arguments: 40 },
      {
        type: "regexNumbersOrSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-z .'-]*$/),
      },
    ],
  },
  middleName: {
    type: "text",
    journeyKey: "middleName",
    validate: [
      { type: "minlength", arguments: 2 },
      { type: "nameMaxLength", fn: nameMaxLength, arguments: 40 },
      {
        type: "regexNumbersOrSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-z .'-]*$/),
      },
    ],
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [] },
      { type: "after", arguments: ["1904-02-12"] },
    ],
  },
  "dateOfBirth-day": {
    type: "text",
    validate: [],
    autocomplete: "bday-day",
  },
  "dateOfBirth-month": {
    type: "text",
    validate: [],
    autocomplete: "bday-month",
  },
  "dateOfBirth-year": {
    type: "text",
    validate: [],
    autocomplete: "bday-year",
  },
};
