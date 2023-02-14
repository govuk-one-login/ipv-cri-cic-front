const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const BrpDetailsController = require('./brpDetails');

describe("BrpDetailsController", () => {
  const brpDetailsController = new BrpDetailsController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(brpDetailsController).to.be.an.instanceOf(BaseController);
  });

})