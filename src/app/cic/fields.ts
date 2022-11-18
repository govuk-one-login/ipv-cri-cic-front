
export const FIELDS = {
  photoIdChoice: {
    type: "radios",
    items: ["ukPassport", "brp", "ukPhotocardDL", "otherPassport"],
    validate: ["required"]
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: ["required"]
  },
  expiryDate: {
    type: "date",
    journeyKey: "expiryDate",
    validate: ["required"]
  },
  passportNumber: {
    type: "text",
    validate: 'required'
  }
};
