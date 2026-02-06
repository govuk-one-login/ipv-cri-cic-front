const { expect } = require("chai");
const fields = require("./fields");

const getRule = (fieldConfig, type) =>
  fieldConfig.validate.find((rule) => rule && rule.type === type);

describe("Fields validation", () => {
  describe("Name fields - maxlength", () => {
    const assertMaxLength = (fieldKey) => {
      const fieldConfig = fields[fieldKey];
      const rule = getRule(fieldConfig, "maxlength");

      it(`${fieldKey} should have a maxlength validator`, () => {
        expect(rule, `${fieldKey} missing maxlength rule`).to.exist;
        expect(rule.arguments, `${fieldKey} maxlength rule missing arguments`).to.exist;
        expect(rule.arguments).to.equal(40);
      });
    };

    ["surname", "firstName", "middleName"].forEach(assertMaxLength);
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
