const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const { afterEach } = require("mocha");
const JourneyTypeController = require('./journeyType.js');
const { API } = require("../../../lib/config.js");

console.log = sinon.fake();

describe("JourneyTypeController", () => {
  const journeyTypeController = new JourneyTypeController({ route: '/test' });
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
    expect(journeyTypeController).to.be.an.instanceOf(BaseController);
  });

  describe("saveValues", () => {
    it("should fetch the journey type from the session config endpoint", async () => {
      req.axios.get = sinon.fake.resolves({ data: { journey_type: "FACE_TO_FACE" }});

      await journeyTypeController.saveValues(req, res, next);

      sinon.assert.calledWith(
        req.axios.get,
        `${API.PATHS.SESSION_CONFIG}`,
        { headers: { "x-govuk-signin-session-id": req.session.tokenId } }
      );
      const journeyType = req.sessionModel.get("journeyType");
      expect(journeyType).to.equal("FACE_TO_FACE");
    });

    it("should handle error if call to session config endpoint fails", async () => {
      req.axios.get = sinon.fake.rejects("Error");

      await journeyTypeController.saveValues(req, res, next);

      sinon.assert.calledWith(console.log, "Error fetching journey type");
      expect(next).to.have.been.calledOnce;
    });
  });
});

