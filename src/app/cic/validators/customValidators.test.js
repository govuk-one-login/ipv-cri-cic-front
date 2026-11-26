import { describe, it, expect } from "vitest";
import { nameMaxLength } from "./customValidators.js";

describe("custom validators", () => {
  describe("nameMaxLength()", () => {
    [null, undefined, "", " \t   "].forEach((input) => {
      it(`passes validation for empty or whitespace input: ${JSON.stringify(input)}`, () => {
        const result = nameMaxLength(input);
        expect(result).toEqual(true);
      });
    });

    it("passes validation for a valid input", () => {
      const result = nameMaxLength("hello", 10);
      expect(result).toEqual(true);
    });

    it("fails validation for invalid input", () => {
      const result = nameMaxLength("hello", 1);
      expect(result).toEqual(false);
    });

    it("handles edge cases correctly", () => {
      expect(nameMaxLength("1234567", 8)).toEqual(true);
      expect(nameMaxLength("12345678", 8)).toEqual(true);
      expect(nameMaxLength("123456789", 8)).toEqual(false);
    });

    it("handles non-obvious input types", () => {
      expect(nameMaxLength(Buffer.from("short"), 6)).toEqual(true);
      expect(nameMaxLength(Buffer.from("very long"), 6)).toEqual(false);
      expect(nameMaxLength(1000, 3)).toEqual(false);
      expect(nameMaxLength(1000, 5)).toEqual(true);
      expect(nameMaxLength(true, "4")).toEqual(true);
      expect(nameMaxLength(false, "4")).toEqual(false);
      expect(nameMaxLength(false, "5")).toEqual(true);
    });
  });
});
