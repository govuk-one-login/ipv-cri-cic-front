import wizard from "hmpo-form-wizard";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import { config } from "../../../lib/config.js";
import { JourneyTypeController } from "./journeyType.js";

vi.spyOn(console, "log");

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
    vi.spyOn(console, "error");
  });

  afterEach(() => {
    vi.mocked(console.error).mockRestore();
  });

  it("should be an instance of BaseController", () => {
    expect(journeyTypeController).toBeInstanceOf(wizard.Controller);
  });

  describe("saveValues", () => {
    it("should fetch the journey type from the session config endpoint", async () => {
      vi.spyOn(req.axios, "get").mockResolvedValue({
        data: { journey_type: "f2f" },
      });

      await journeyTypeController.saveValues(req, res, next);

      expect(req.axios.get).toHaveBeenCalledWith(
        `${config.API.PATHS.SESSION_CONFIG}`,
        {
          headers: {
            "txma-audit-encoded": "dummy-txma-header",
            "x-govuk-signin-session-id": req.session.tokenId,
          },
        },
      );
      const journeyType = req.sessionModel.get("journeyType");
      expect(journeyType).toEqual("f2f");
    });

    it("should handle error if call to session config endpoint fails", async () => {
      vi.spyOn(req.axios, "get").mockRejectedValue("Request error");

      await journeyTypeController.saveValues(req, res, next);

      expect(console.log).toHaveBeenCalledWith(
        "Error fetching journey type",
        "Request error",
      );
      expect(next).toHaveBeenCalled();
    });

    it("should redirect to /error if session token is missing", async () => {
      req.session.tokenId = null;

      await journeyTypeController.saveValues(req, res, next);

      expect(console.error).toHaveBeenCalledWith(
        "Missing sessionID, redirecting to /error",
      );
      expect(res.redirect).toHaveBeenCalledWith("/error");
      expect(next).not.toHaveBeenCalled();
    });
  });
});
