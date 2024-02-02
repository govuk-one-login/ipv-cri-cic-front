const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const NameEntryController = require('./nameEntry');

describe("NameEntryController", () => {
  const nameEntryController = new NameEntryController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(nameEntryController).to.be.an.instanceOf(BaseController);
  });

})