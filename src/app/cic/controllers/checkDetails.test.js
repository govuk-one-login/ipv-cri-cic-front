const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const CheckDetailsController = require("./checkDetails");
const {
  API: {
    PATHS: { SAVE_CICDATA },
  },
} = require("../../../lib/config");

describe("CheckDetails controller", () => {
  let checkDetailsController;

  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;

    checkDetailsController = new CheckDetailsController({ route: "/test" });
    req.session.tokenId = 123456;
    sinon.stub(console, "error");
  });

  afterEach(() => {
    console.error.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(checkDetailsController).to.be.an.instanceOf(BaseController);
  });

  describe("#locals", () => {
    let prototypeSpy;

    beforeEach(() => {
      prototypeSpy = sinon.stub(BaseController.prototype, "locals");
      BaseController.prototype.locals.callThrough();
    });

    afterEach(() => {
      prototypeSpy.restore();
    });

    context("with error on callback", () => {
      let error;
      let locals;
      let superLocals;

      beforeEach(async () => {
        error = new Error("Random error");
        superLocals = {
          superKey: "superValue",
        };

        locals = {
          key: "value",
        };
        res.locals = locals;
        BaseController.prototype.locals.yields(error, superLocals);

        await checkDetailsController.locals(req, res, next);
      });

      it("should call callback with error and existing locals", () => {
        expect(next).to.have.been.calledWith(error, superLocals);
      });
    });
  });

  describe("#saveValues", () => {
    context("on journey save cic data", () => {
      it("should call claimedIdentity endpoint", async () => {
        req.axios.post = sinon.fake.resolves();

        const givenNamesVal = req.sessionModel.get("middleName")
          ? req.sessionModel.get("firstName") +
            " " +
            req.sessionModel.get("middleName")
          : req.sessionModel.get("firstName");
        const cicData = {
          given_names: `${givenNamesVal}`,
          family_names: req.sessionModel.get("surname"),
          date_of_birth: req.sessionModel.get("dateOfBirth"),
        };

        await checkDetailsController.saveValues(req, res, next);
        expect(next).to.have.been.calledOnce;
        expect(req.axios.post).to.have.been.calledWithExactly(
          SAVE_CICDATA,
          cicData,
          {
            headers: {
              "x-govuk-signin-session-id": req.session.tokenId,
            },
          },
        );
      });

      it("should redirect to /error if session token is missing", async () => {
        req.session.tokenId = null;

        await checkDetailsController.saveValues(req, res, next);

        sinon.assert.calledWith(
          console.error,
          "Missing sessionID, redirecting to /error",
        );
        sinon.assert.calledWith(res.redirect, "/error");
      });
    });
  });
});
