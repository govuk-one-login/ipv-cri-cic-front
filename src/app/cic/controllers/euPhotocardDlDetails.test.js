const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const EuPhotocardDlController = require('./euPhotocardDlDetails');

describe("EuPhotocardDlController", () => {
  const euPhotocardDlController = new EuPhotocardDlController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(euPhotocardDlController).to.be.an.instanceOf(BaseController);
  });

})