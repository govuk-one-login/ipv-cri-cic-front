const { formatDate } = require("./utils");
const { expect } = require("chai");

describe("formatDate", () => {
  it("returns a YYYY-MM-DD date with language set to en as DD Month(English) YYYY", () => {
    expect(formatDate("1989-03-31", "en")).to.equal("31 March 1989");
  });

  it("returns a YYYY-MM-DD date with language set to cy as DD Month(Welsh) YYYY", () => {
    expect(formatDate("1989-03-31", "cy")).to.equal("31 Mawrth 1989");
  });

  it("returns a YYYYMM/DD date as Invalid date", () => {
    expect(formatDate("198903/31", "YYYY-MM-DD")).to.equal("Invalid Date");
  });

  it("should return an empty string if date is empty string", () => {
    expect(formatDate("", "YYYY-MM-DD")).to.equal(undefined);
  });

  it("should return an empty string if date is empty", () => {
    expect(formatDate(null, "YYYY-MM-DD")).to.equal(undefined);
  });
});
