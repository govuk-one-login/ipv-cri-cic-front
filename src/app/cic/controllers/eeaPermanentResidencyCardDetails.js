const moment = require("moment");
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const DateController = DateControllerMixin(BaseController);

class EeaPermanentResidencyCardController extends DateController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      locals.eeaPrCardExpiryDate = req.sessionModel.get("eeaPrCardExpiryDate");
      callback(err, locals);
    });
  }
}
module.exports = EeaPermanentResidencyCardController;
