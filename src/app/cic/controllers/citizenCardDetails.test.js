const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const CitizenCardController = require('./citizenCardDetails');

describe("CitizenCardController", () => {
  const citizenCardController = new CitizenCardController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(citizenCardController).to.be.an.instanceOf(BaseController);
  });

})