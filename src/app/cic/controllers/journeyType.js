const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");

class JourneyTypeController extends BaseController {
  async saveValues(req, res, next) {
    const tokenId = req.session.tokenId;

    if (tokenId) {
      try {
        const { data } = await req.axios.get(`${API.PATHS.SESSION_CONFIG}`, {
          headers: {
            "x-govuk-signin-session-id": tokenId,
            ...createPersonalDataHeaders(`${API.BASE_URL}${API.PATHS.SESSION_CONFIG}`, req),
          },
        });
        req.sessionModel.set("journeyType", data.journey_type);
        return next();
      } catch (error) {
        console.log("Error fetching journey type", error);
        return next(error);
      }
    } else {
      console.error("Missing sessionID, redirecting to /error");
      res.redirect("/error");
    }
  }
}

module.exports = JourneyTypeController;
