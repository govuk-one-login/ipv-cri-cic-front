const { Controller: BaseController } = require("hmpo-form-wizard");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    const sharedClaims = req.session?.shared_claims;

    if (sharedClaims) {

      if (sharedClaims?.passport?.length > 0) {
        req.sessionModel.set("passportExpiryDate", sharedClaims.passport[0].expiryDate);
      }
    }
    super.saveValues(req, res, next);
  }
}

module.exports = RootController;
