const { expect } = require("chai");
const fields = require("./fields");

describe("Fields maxLength ", () => {
  const testFieldLength = (fieldConfig, value) => {
    const maxLengthRule = fieldConfig.validate.find(
      (rule) => rule.type === "maxlength",
    );
    return value.length <= maxLengthRule.arguments;
  };

  const nameFields = {
    surname: fields.surname,
    firstName: fields.firstName,
    middleName: fields.middleName,
  };

  Object.entries(nameFields).forEach(([fieldName, config]) => {
    testNameField(fieldName, config);
  });

  describe("Date of Birth", () => {
    const { dateOfBirth } = fields;

    it("should reject dates that exceed the maximum length", () => {
      const date = "1990-01-01T00:00:00Z";
      const isValid = testFieldLength(dateOfBirth, date);
      expect(
        isValid,
        `Date string exceeds maximum allowed length. Expected length to be less than ${
          dateOfBirth.validate.find((rule) => rule.type === "maxlength")
            .arguments
        }, but got ${date.length}`,
      ).to.be.false;
    });
  });
});
