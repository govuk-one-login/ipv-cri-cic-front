
module.exports = {
  photoIdChoice: {
    type: "radios",
    items: ["ukPassport", "brp", "ukPhotocardDL", "otherPassport"],
    validate: ["required"]
  },
  expiryDate: {
    type: "date",
    validate: ["required"]
  },
  surname: {
    type: "text",
    validate: ["required"]
  }
};
