import wizard from "hmpo-form-wizard";
import { expect } from "chai";
import { NameEntryController } from "./nameEntry.js";

describe("NameEntryController", () => {
  const nameEntryController = new NameEntryController({ route: "/test" });

  it("should be an instance of BaseController", () => {
    expect(nameEntryController).to.be.an.instanceOf(wizard.Controller);
  });
});
