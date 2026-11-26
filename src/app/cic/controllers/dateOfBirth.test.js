import wizard from "hmpo-form-wizard";
import { describe, it, expect } from "vitest";
import { DateOfBirthController } from "./dateOfBirth.js";

describe("DateOfBirthController", () => {
  const dateOfBirthController = new DateOfBirthController({ route: "/test" });

  it("should be an instance of BaseController", () => {
    expect(dateOfBirthController).toBeInstanceOf(wizard.Controller);
  });
});
