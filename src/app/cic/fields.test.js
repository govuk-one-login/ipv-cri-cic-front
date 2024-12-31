const { expect } = require("chai");
const fields = require("./fields");

describe("Field Validation", () => {
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
      it("should accept valid names", () => {
        const validNames = ["Smith", "O'Connor", "Van der Berg", "Smith-Jones"];
        validNames.forEach((name) => {
          const validationResults = fieldConfig.validate
            .filter((rule) => typeof rule === "object")
            .every((rule) => {
              if (rule.type === "minlength")
                return name.length >= rule.arguments;
              if (rule.type === "maxlength")
                return name.length <= rule.arguments;
              if (rule.type === "regexNumbersOrSpecialCharacters")
                return rule.fn(name);
              return true;
            });
          expect(validationResults).to.be.true;
        });
      });

      it("should reject names that are too short", () => {
        const name = "A";
        const minLengthRule = fieldConfig.validate.find(
          (rule) => rule.type === "minlength",
        );
        expect(
          name.length >= minLengthRule.arguments,
          `Name '${name}' is too short. Minimum length is ${minLengthRule.arguments}`,
        ).to.be.false;
      });

      it("should reject names that are too long", () => {
        const name = "A".repeat(41);
        testFieldLength(
          fieldConfig,
          name,
          `${fieldName} exceeds maximum allowed length`,
        );
      });

      it("should reject names with invalid characters", () => {
        const invalidNames = ["John123", "Mary#Smith", "Test@Name", "12345"];
        invalidNames.forEach((name) => {
          const regexRule = fieldConfig.validate.find(
            (rule) => rule.type === "regexNumbersOrSpecialCharacters",
          );
          expect(
            regexRule.fn(name),
            `Name '${name}' contains invalid characters. Only letters, spaces, hyphens, and apostrophes are allowed`,
          ).to.be.null;
        });
      });
    });
  };

  // Test all name fields
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

    it("should accept valid date formats", () => {
      const validDates = ["1990-01-01", "2000-12-31"];
      validDates.forEach((date) => {
        const maxLengthRule = dateOfBirth.validate.find(
          (rule) => rule.type === "maxlength",
        );
        expect(
          date.length <= maxLengthRule.arguments,
          `Date '${date}' is not a valid date format`,
        ).to.be.true;
      });
    });

    it("should reject dates that are too long", () => {
      const date = "1990-01-01T00:00:00Z";
      testFieldLength(
        dateOfBirth,
        date,
        "Date string exceeds maximum allowed length",
      );
    });
  });
});
