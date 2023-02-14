const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const EuIdentityCardController = require('./euIdentityCardDetails');

describe("EuIdentityCardController", () => {
  const euIdentityCardController = new EuIdentityCardController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(euIdentityCardController).to.be.an.instanceOf(BaseController);
  });

})