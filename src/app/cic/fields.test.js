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

  describe("Date of Birth - no maxlength restriction", () => {
    const { dateOfBirth } = fields;

    it("should not have a maxlength validator (avoid truncation while typing)", () => {
      const rule = getRule(dateOfBirth, "maxlength");
      expect(rule).to.not.exist;
    });

    it("should still have required + date validators", () => {
      expect(dateOfBirth.validate.includes("required")).to.equal(true);
      expect(dateOfBirth.validate.includes("date")).to.equal(true);
    });

    it("should still have before + after validators", () => {
      expect(!!getRule(dateOfBirth, "before")).to.equal(true);
      expect(!!getRule(dateOfBirth, "after")).to.equal(true);
    });
  });
});
