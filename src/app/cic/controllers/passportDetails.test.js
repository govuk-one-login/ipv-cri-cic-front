const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const PassportDetailsController = require('./passportDetails');

describe("PassportDetailsController", () => {
  const passportDetailsController = new PassportDetailsController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(passportDetailsController).to.be.an.instanceOf(BaseController);
  });

})