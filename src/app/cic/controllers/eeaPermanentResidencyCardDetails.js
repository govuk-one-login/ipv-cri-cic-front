const moment = require('moment');
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
  async saveValues(req, res, next) {
    try {
      const eeaPrCardExpiryDate = req.form.values.eeaPrCardExpiryDate;
      const inputDate = moment(eeaPrCardExpiryDate, 'YYYY-MM-DD');
      const isOutsideExpireWindow = inputDate.isAfter(  new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
        .toISOString()
        .split("T")[0],'months')
        
      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("expiryDate", eeaPrCardExpiryDate);
      req.sessionModel.set("photoIdChoice", "EEA permanent residency card");
      req.sessionModel.set("changeUrl", "eeaPermanentResidencyCardDetails");

      return next();
    } catch (err) {
      return next(err);
    }
  }
  next(req) {
    if (req.sessionModel.get("isOutsideExpireWindow")) {
      return "/nameEntry"
    } else{
      return "/photoIdExpiry"
    }
  }
}
module.exports = EeaPermanentResidencyCardController;
