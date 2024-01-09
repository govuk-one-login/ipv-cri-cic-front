module.exports = {
  surname: {
    type: "text",
    journeyKey: "surname",
    validate: [
      "required",
      { type: "minlength", arguments: 2 },
      { type: "regexSpecialCharacters", fn: (value) => value.match(/^[A-Za-z0-9 .'-]*$/) },
      { type: "regexNumber", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) }
    ]
  },
  firstName: {
    type: "text",
    journeyKey: "firstName",
    validate: [
      "required",
      { type: "minlength", arguments: 2 },
      { type: "regexSpecialCharacters", fn: (value) => value.match(/^[A-Za-z0-9 .'-]*$/) },
      { type: "regexNumber", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) }
    ]
  },
  middleName: {
    type: "text",
    journeyKey: "middleName",
    validate: [
      { type: "minlength", arguments: 2 },
      { type: "regexSpecialCharacters", fn: (value) => value.match(/^[A-Za-z0-9 .'-]*$/) },
      { type: "regexNumber", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) }
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
