const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    const sharedClaims = req.session?.shared_claims;

    if (sharedClaims) {
      if (sharedClaims?.name?.length > 0) {
        req.sessionModel.set("firstName", sharedClaims.name[0].nameParts[0].value);
        req.sessionModel.set("surname", sharedClaims.name[0].nameParts[2].value);
      }
      if (sharedClaims?.birthDate?.length > 0) {
        req.sessionModel.set("dateOfBirth", sharedClaims.birthDate[0].value);
      }
    }

    try {
      const headers = {
        "x-govuk-signin-session-id": req.session.tokenId
      }

      const { data } = await req.axios.get(`${API.PATHS.SESSION_CONFIG}`, { headers });
      req.sessionModel.set("journeyType", data.journey_type);
      return next()
    } catch (error) {
      console.log("Error fetching journey type", error)
      return next(error)
    }
  }
}

module.exports = RootController;