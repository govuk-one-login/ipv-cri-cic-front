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
        passport: [
          {
            expiryDate: "2024-03-01"
          }
        ],
        name: [
          {
            nameParts: [
              {
                value: "First"
              },
              {
                value: "Middle"
              },
              {
                value: "Last"
              }
            ]
          }],
        birthDate: [
          {
            value: "1999-03-01"
          }
        ]
      };

      await rootController.saveValues(req, res, next);
      const passportExpiryDate = req.sessionModel.get("passportExpiryDate");
      const nonUKPassportExpiryDate = req.sessionModel.get("nonUKPassportExpiryDate");
      const firstName = req.sessionModel.get("firstName");
      const surname = req.sessionModel.get("surname");
      const dateOfBirth = req.sessionModel.get("dateOfBirth");

      expect(passportExpiryDate).to.equal("2024-03-01")
      expect(nonUKPassportExpiryDate).to.equal("2024-03-01");
      expect(firstName).to.equal("First");
      expect(surname).to.equal("Last");
      expect(dateOfBirth).to.equal("1999-03-01");
    });
  });

  it("should save appropriate values to sessionModel with partial shared_claims object", async () => {

    req.session.shared_claims = {
      passport: [],
      name: [
        {
          nameParts: [
            {
              value: "First"
            },
            {
              value: "Middle"
            },
            {
              value: "Last"
            }
          ]
        }],
      birthDate: [
        {
          value: "1999-03-01"
        }
      ],
      sessionModel: {
        set: sinon.fake(),
      },
      anything: {
        set: sinon.fake(),
      }
    };

    await rootController.saveValues(req, res, next);
    const passportExpiryDate = req.sessionModel.get("passportExpiryDate");
    const nonUKPassportExpiryDate = req.sessionModel.get("nonUKPassportExpiryDate");
    const firstName = req.sessionModel.get("firstName");
    const surname = req.sessionModel.get("surname");
    const dateOfBirth = req.sessionModel.get("dateOfBirth");

    expect(passportExpiryDate).to.equal(undefined);
    expect(nonUKPassportExpiryDate).to.equal(undefined);
    expect(firstName).to.equal("First");
    expect(surname).to.equal("Last");
    expect(dateOfBirth).to.equal("1999-03-01");
    expect(req.session.shared_claims.sessionModel.set.called).to.be.false;
    expect(req.session.shared_claims.anything.set.called).to.be.false;
  });

  it("should not update sessionModel if no shared_claims attributes present", async () => {

    req.session.shared_claims = {
      passport: [],
      name: [],
      birthDate: [],
      sessionModel: {
        set: sinon.fake(),
      },
      anything: {
        set: sinon.fake(),
      }
    };

    await rootController.saveValues(req, res, next);
    expect(req.session.shared_claims.sessionModel.set.called).to.be.false;
    expect(req.session.shared_claims.anything.set.called).to.be.false;
  });
});

