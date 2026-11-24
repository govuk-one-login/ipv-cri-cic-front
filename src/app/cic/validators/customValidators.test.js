import { expect } from "chai";
import { nameMaxLength } from "./customValidators.js";

describe("custom validators", () => {
  describe("nameMaxLength()", () => {
    [null, undefined, "", " \t   "].forEach((input) => {
      it(`passes validation for empty or whitespace input: ${JSON.stringify(input)}`, () => {
        const result = nameMaxLength(input);
        expect(result).to.equal(true);
      });
    });

    it("passes validation for a valid input", () => {
      const result = nameMaxLength("hello", 10);
      expect(result).to.equal(true);
    });

    it("fails validation for invalid input", () => {
      const result = nameMaxLength("hello", 1);
      expect(result).to.equal(false);
    });

    it("handles edge cases correctly", () => {
      expect(nameMaxLength("1234567", 8)).to.equal(true);
      expect(nameMaxLength("12345678", 8)).to.equal(true);
      expect(nameMaxLength("123456789", 8)).to.equal(false);
    });

    it("handles non-obvious input types", () => {
      expect(nameMaxLength(Buffer.from("short"), 6)).to.equal(true);
      expect(nameMaxLength(Buffer.from("very long"), 6)).to.equal(false);
      expect(nameMaxLength(1000, 3)).to.equal(false);
      expect(nameMaxLength(1000, 5)).to.equal(true);
      expect(nameMaxLength(true, "4")).to.equal(true);
      expect(nameMaxLength(false, "4")).to.equal(false);
      expect(nameMaxLength(false, "5")).to.equal(true);
    });
  });
});
