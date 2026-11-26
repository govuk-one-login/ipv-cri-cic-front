import { describe, it, expect } from "vitest";
import { fields } from "./fields.js";

const getRule = (fieldConfig, type) =>
  fieldConfig.validate.find((rule) => rule && rule.type === type);

describe("Fields validation", () => {
  describe("Name fields - maxlength", () => {
    it.each(["surname", "firstName", "middleName"])(
      `%s should have a maxlength validator`,
      (fieldKey) => {
        const fieldConfig = fields[fieldKey];
        const rule = getRule(fieldConfig, "maxlength");

        expect(rule, `${fieldKey} missing maxlength rule`).not.toBeFalsy();
        expect(
          rule.arguments,
          `${fieldKey} maxlength rule missing arguments`,
        ).not.toBeFalsy();
        expect(rule.arguments).toEqual(40);
      },
    );
  });

  describe("Date of Birth - no maxlength restriction", () => {
    const { dateOfBirth } = fields;

    it("should not have a maxlength validator (avoid truncation while typing)", () => {
      const rule = getRule(dateOfBirth, "maxlength");
      expect(rule).toBeFalsy();
    });

    it("should still have required + date validators", () => {
      expect(dateOfBirth.validate.includes("required")).toEqual(true);
      expect(dateOfBirth.validate.includes("date")).toEqual(true);
    });

    it("should still have before + after validators", () => {
      expect(!!getRule(dateOfBirth, "before")).toEqual(true);
      expect(!!getRule(dateOfBirth, "after")).toEqual(true);
    });
  });
});
