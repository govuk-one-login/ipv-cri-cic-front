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
        // "x-govuk-signin-session-id": req.session.tokenId
        "x-govuk-signin-session-id": "d6ac1467-f2a0-49b7-b735-880c99ad888a"
      }

      const { data } = await req.axios.get(`${API.PATHS.SESSION_CONFIG}`, { headers});
      req.sessionModel.set("journey_type", data.journey_type);
    } catch (error) {
      console.log("Error fetching journey type", error)
      next(error)
    }

    super.saveValues(req, res, next);
  }
}

module.exports = RootController;