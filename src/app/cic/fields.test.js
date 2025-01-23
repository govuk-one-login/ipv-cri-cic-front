const { expect } = require("chai");
const fields = require("./fields");

describe("Fields maxLength ", () => {
  const testFieldLength = (fieldConfig, value, errorMessage) => {
    const maxLengthRule = fieldConfig.validate.find(
      (rule) => rule.type === "maxlength",
    );
    const isValid = value.length <= maxLengthRule.arguments;

    expect(
      isValid,
      `${errorMessage}. Expected length to be less than ${maxLengthRule.arguments}, but got ${value.length}`,
    ).to.be.false;
  };

  const testNameField = (fieldName, fieldConfig) => {
    describe(`${fieldName}`, () => {
      it("should reject names that exceed the maximum length", () => {
        const name = "A".repeat(41);
        testFieldLength(
          fieldConfig,
          name,
          `${fieldName} exceeds maximum allowed length`,
        );
      });
    });
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
      testFieldLength(
        dateOfBirth,
        date,
        "Date string exceeds maximum allowed length",
      );
    });
  });
});
