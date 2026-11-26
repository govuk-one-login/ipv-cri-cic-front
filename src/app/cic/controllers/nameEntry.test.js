import wizard from "hmpo-form-wizard";
import { describe, it, expect } from "vitest";
import { NameEntryController } from "./nameEntry.js";

describe("NameEntryController", () => {
  const nameEntryController = new NameEntryController({ route: "/test" });

  it("should be an instance of BaseController", () => {
    expect(nameEntryController).toBeInstanceOf(wizard.Controller);
  });
});
