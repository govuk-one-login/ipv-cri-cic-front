module.exports = {
  surname: {
    type: "text",
    journeyKey: "surname",
    validate: [
      "required",
      { type: "minlength", arguments: 2 },
      {
        type: "regexNumbersOrSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-zÀ-ú .'-]*$/),
      },
      { 
        type: "regexAccents", 
        fn: (value) => value.match(/^[a-zA-Z .'-]*$/) 
      },
    ],
  },
  firstName: {
    type: "text",
    journeyKey: "firstName",
    validate: [
      "required",
      { type: "minlength", arguments: 2 },
      {
        type: "regexNumbersOrSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-zÀ-ú .'-]*$/),
      },
      { 
        type: "regexAccents", 
        fn: (value) => value.match(/^[a-zA-Z .'-]*$/) 
      },
    ],
  },
  middleName: {
    type: "text",
    journeyKey: "middleName",
    validate: [
      { type: "minlength", arguments: 2 },
      {
        type: "regexNumbersOrSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-zÀ-ú .'-]*$/),
      },
      { 
        type: "regexAccents", 
        fn: (value) => value.match(/^[a-zA-Z .'-]*$/) 
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
};
