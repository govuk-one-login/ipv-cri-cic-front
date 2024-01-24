const { Controller: BaseController } = require("hmpo-form-wizard");

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
    super.saveValues(req, res, next);
  }
}

module.exports = RootController;