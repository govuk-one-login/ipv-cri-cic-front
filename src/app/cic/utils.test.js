import { formatDate } from "./utils.js";
import { describe, it, expect } from "vitest";

describe("formatDate", () => {
  it("returns a YYYY-MM-DD date with language set to en as DD Month(English) YYYY", () => {
    expect(formatDate("1989-03-31", "YYYY-MM-DD", "en")).toEqual(
      "31 March 1989",
    );
  });

  it("returns a YYYY-MM-DD date with language set to cy as DD Month(Welsh) YYYY", () => {
    expect(formatDate("1989-03-31", "YYYY-MM-DD", "cy")).toEqual(
      "31 Mawrth 1989",
    );
  });

  it("returns a YYYYMM/DD date as an empty string", () => {
    expect(formatDate("198903/31", "YYYY-MM-DD", "en")).toEqual("");
  });

  it("should return an empty string if date is empty string", () => {
    expect(formatDate("", "YYYY-MM-DD", "en")).toEqual("");
  });

  it("should return an empty string if date is empty", () => {
    expect(formatDate(null, "YYYY-MM-DD", "en")).toEqual("");
  });
});
