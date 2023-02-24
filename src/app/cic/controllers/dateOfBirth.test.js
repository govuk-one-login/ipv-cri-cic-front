const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const DateOfBirthController = require('./dateOfBirth');

describe("DateOfBirthController", () => {
  const dateOfBirthController = new DateOfBirthController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(dateOfBirthController).to.be.an.instanceOf(BaseController);
  });

})