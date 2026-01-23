const { expect } = require("chai");
const fields = require("./fields");

const getRule = (fieldConfig, type) =>
  fieldConfig.validate.find((rule) => rule && rule.type === type);

describe("Fields validation", () => {
  describe("Name fields - nameMaxLength", () => {
    const assertNameMaxLength = (fieldKey) => {
      const fieldConfig = fields[fieldKey];
      const rule = getRule(fieldConfig, "nameMaxLength");

      it(`${fieldKey} should have a nameMaxLength validator`, () => {
        expect(rule, `${fieldKey} missing nameMaxLength rule`).to.exist;
        expect(rule.fn, `${fieldKey} nameMaxLength rule missing fn`).to.be.a(
          "function",
        );
        expect(
          rule.arguments,
          `${fieldKey} nameMaxLength rule missing arguments`,
        ).to.exist;
        expect(rule.arguments).to.equal(40);
      });

      it(`${fieldKey} should allow <= 40 characters`, () => {
        const value = "a".repeat(40);
        const isValid = rule.fn(value, rule.arguments);
        expect(isValid).to.equal(true);
      });

      it(`${fieldKey} should reject > 40 characters`, () => {
        const value = "a".repeat(41);
        const isValid = rule.fn(value, rule.arguments);
        expect(isValid).to.equal(false);
      });

      it(`${fieldKey} should treat empty as valid (handled by required if present)`, () => {
        const isValid = rule.fn("", rule.arguments);
        expect(isValid).to.equal(true);
      });
    };

    ["surname", "firstName", "middleName"].forEach(assertNameMaxLength);
  });

  describe("Fields maxLength", () => {
    const testFieldLength = (fieldConfig, value) => {
      const maxLengthRule = getRule(fieldConfig, "maxlength");
      return value.length <= maxLengthRule.arguments;
    };

    describe("Date of Birth", () => {
      const { dateOfBirth } = fields;

      it("should reject dates that exceed the maximum length", () => {
        const date = "1990-01-01T00:00:00Z";
        const isValid = testFieldLength(dateOfBirth, date);
        expect(
          isValid,
          `Date string exceeds maximum allowed length. Expected length to be less than ${
            getRule(dateOfBirth, "maxlength").arguments
          }, but got ${date.length}`,
        ).to.be.false;
      });
    });
  });
});
