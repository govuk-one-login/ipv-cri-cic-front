import wizard from "hmpo-form-wizard";
import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import { config } from "../../../lib/config.js";
import { CheckDetailsController } from "./checkDetails.js";

describe("CheckDetails controller", () => {
  const checkDetailsController = new CheckDetailsController({ route: "/test" });
  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;

    req.session.tokenId = 123456;
    vi.spyOn(console, "error");
  });

  afterEach(() => {
    vi.mocked(console.error).mockRestore();
  });

  it("should be an instance of BaseController", () => {
    expect(checkDetailsController).to.be.an.instanceOf(wizard.Controller);
  });

  describe("#locals", () => {
    let prototypeSpy;

    beforeEach(() => {
      prototypeSpy = vi.spyOn(wizard.Controller.prototype, "locals");
    });

    afterEach(() => {
      prototypeSpy.mockRestore();
    });

    describe("with error on callback", () => {
      let error;
      let locals;
      let superLocals;

      beforeEach(() => {
        error = new Error("Random error");
        superLocals = {
          superKey: "superValue",
        };

        locals = {
          key: "value",
        };
        res.locals = locals;
        prototypeSpy.mockImplementation((req, res, next) => {
          next(error, superLocals);
        });

        checkDetailsController.locals(req, res, next);
      });

      it("should call callback with error and existing locals", () => {
        expect(next).to.have.been.calledWith(error, superLocals);
      });
    });
  });

  describe("#saveValues", () => {
    describe("on journey save cic data", () => {
      it("should call claimedIdentity endpoint", async () => {
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
        expect(req.axios.post).toHaveBeenCalledWith(
          config.API.PATHS.SAVE_CICDATA,
          cicData,
          {
            headers: {
              "txma-audit-encoded": "dummy-txma-header",
              "x-govuk-signin-session-id": req.session.tokenId,
            },
          },
        );
      });

      it("should redirect to /error if session token is missing", async () => {
        req.session.tokenId = null;
        await checkDetailsController.saveValues(req, res, next);

        expect(console.error).toHaveBeenCalledWith(
          "Missing sessionID, redirecting to /error",
        );
        expect(res.redirect).toHaveBeenCalledWith("/error");
      });
    });
  });
});
