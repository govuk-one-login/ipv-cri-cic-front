const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const { afterEach } = require("mocha");
const RootController = require('./root.js');

describe("RootController", () => {
  const rootController = new RootController({ route: '/test' });
  let req;
  let res;
  let next;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(rootController).to.be.an.instanceOf(BaseController);
  });

  describe("saveValues", () => {
    it("should save all values to sessionModel with full shared_claims object", async () => {

      req.session.shared_claims = {
        name: [
          {
            nameParts: [
              { value: "First" },
              { value: "Middle" },
              { value: "Last" }
            ]
          }],
        birthDate: [{ value: "1999-03-01" }]
      };

      await rootController.saveValues(req, res, next);
      const firstName = req.sessionModel.get("firstName");
      const surname = req.sessionModel.get("surname");
      const dateOfBirth = req.sessionModel.get("dateOfBirth");

      expect(firstName).to.equal("First");
      expect(surname).to.equal("Last");
      expect(dateOfBirth).to.equal("1999-03-01");
    });
  });

  it("should save appropriate values to sessionModel with partial shared_claims object", async () => {

    req.session.shared_claims = {
      name: [
        {
          nameParts: [
            { value: "First" },
            { value: "Middle" },
            { value: "Last" }
          ]
        }],
      birthDate: [{ value: "1999-03-01" }]
    };

    await rootController.saveValues(req, res, next);
    const firstName = req.sessionModel.get("firstName");
    const surname = req.sessionModel.get("surname");
    const dateOfBirth = req.sessionModel.get("dateOfBirth");

    expect(firstName).to.equal("First");
    expect(surname).to.equal("Last");
    expect(dateOfBirth).to.equal("1999-03-01");
  });

  it("should not update sessionModel if no shared_claims attributes present", async () => {

    req.session.shared_claims = {
      name: [],
      birthDate: []
    };

    await rootController.saveValues(req, res, next);
    const firstName = req.sessionModel.get("firstName");
    const surname = req.sessionModel.get("surname");
    const dateOfBirth = req.sessionModel.get("dateOfBirth");

    expect(firstName).to.equal(undefined);
    expect(surname).to.equal(undefined);
    expect(dateOfBirth).to.equal(undefined);
  });
});

