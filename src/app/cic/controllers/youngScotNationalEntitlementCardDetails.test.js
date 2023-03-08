const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const YoungScotNationalEntitlementCardDetailsController = require('./youngScotNationalEntitlementCardDetails');

describe("YoungScotNationalEntitlementCardDetailsController", () => {
  const youngScotNationalEntitlementCardDetailsController = new YoungScotNationalEntitlementCardDetailsController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(youngScotNationalEntitlementCardDetailsController).to.be.an.instanceOf(BaseController);
  });

})