import wizard from "hmpo-form-wizard";
import { expect } from "chai";
import { afterEach } from "mocha";
import { config } from "../../../lib/config.js";
import { JourneyTypeController } from "./journeyType.js";

console.log = sinon.fake();

describe("JourneyTypeController", () => {
  const journeyTypeController = new JourneyTypeController({ route: "/test" });
  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
    req.session.tokenId = 123456;
    sinon.stub(console, "error");
  });

  afterEach(() => {
    console.error.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(journeyTypeController).to.be.an.instanceOf(wizard.Controller);
  });

  describe("saveValues", () => {
    it("should fetch the journey type from the session config endpoint", async () => {
      req.axios.get = sinon.fake.resolves({
        data: { journey_type: "f2f" },
      });

      await journeyTypeController.saveValues(req, res, next);

      sinon.assert.calledWith(
        req.axios.get,
        `${config.API.PATHS.SESSION_CONFIG}`,
        {
          headers: {
            "txma-audit-encoded": "dummy-txma-header",
            "x-govuk-signin-session-id": req.session.tokenId,
          },
        },
      );
      const journeyType = req.sessionModel.get("journeyType");
      expect(journeyType).to.equal("f2f");
    });

    it("should handle error if call to session config endpoint fails", async () => {
      req.axios.get = sinon.fake.rejects("Error");

      await journeyTypeController.saveValues(req, res, next);

      sinon.assert.calledWith(console.log, "Error fetching journey type");
      sinon.assert.called(next);
    });

    it("should redirect to /error if session token is missing", async () => {
      req.session.tokenId = null;

      await journeyTypeController.saveValues(req, res, next);

      sinon.assert.calledWith(
        console.error,
        "Missing sessionID, redirecting to /error",
      );
      sinon.assert.calledWith(res.redirect, "/error");
      sinon.assert.notCalled(next);
    });
  });
});
