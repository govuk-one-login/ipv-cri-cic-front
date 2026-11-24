import wizard from "hmpo-form-wizard";
import { expect } from "chai";
import { DateOfBirthController } from "./dateOfBirth.js";

describe("DateOfBirthController", () => {
  const dateOfBirthController = new DateOfBirthController({ route: "/test" });

  it("should be an instance of BaseController", () => {
    expect(dateOfBirthController).to.be.an.instanceOf(wizard.Controller);
  });
});
