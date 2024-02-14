const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");

class JourneyTypeController extends BaseController {
  async saveValues(req, res, next) {
    try {
      const headers = {
        "x-govuk-signin-session-id": "10154159-32ca-403e-a536-e3e3d1c0b3f9",
      }

      const { data } = await req.axios.get(`${API.PATHS.SESSION_CONFIG}`, { headers });
      req.sessionModel.set("journeyType", data.journey_type);
      return next();
    } catch (error) {
      console.log("Error fetching journey type", error)
      return next(error);
    }
  }
}

module.exports = JourneyTypeController;