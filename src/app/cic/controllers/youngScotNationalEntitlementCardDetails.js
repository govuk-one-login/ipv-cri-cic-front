const moment = require("moment");
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class YoungScotNationalEntitlementCardDetailsController extends DateController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.youngScotNationalEntitlementCardExpiryDate = req.sessionModel.get(
        "youngScotNationalEntitlementCardExpiryDate"
      );

      callback(err, locals);
    });
  }
}
module.exports = YoungScotNationalEntitlementCardDetailsController;
