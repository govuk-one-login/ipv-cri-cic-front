const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const NonUKPassportDetailsController = require('./nonUKPassportDetails');

describe("NonUKPassportDetailsController", () => {
  const nonUKPassportDetailsController = new NonUKPassportDetailsController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(nonUKPassportDetailsController).to.be.an.instanceOf(BaseController);
  });

})