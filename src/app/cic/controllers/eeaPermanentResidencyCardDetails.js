const moment = require('moment');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const DateController = DateControllerMixin(BaseController);
const {APP} = require("../../../lib/config");

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

      const isOutsideExpireWindow = inputDate.utc().isAfter(  new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
        .toISOString());      

      // Values used on this page    
      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("eeaPrCardExpiryDate", eeaPrCardExpiryDate);
      //Values used on checkDetails page
      req.sessionModel.set("expiryDate", eeaPrCardExpiryDate);
      req.sessionModel.set("selectedDocument", "EEA Permanent Residency Card");
      req.sessionModel.set("changeUrl", "eeaPermanentResidencyCardDetails");

      return next();
    } catch (err) {
      return next(err);
    }
  }
  next(req) {
    if (req.sessionModel.get("isOutsideExpireWindow")) {
      return APP.PATHS.NAME_ENTRY
    } else{
      return APP.PATHS.EXPIRED_ID
    }
  }
}
module.exports = EeaPermanentResidencyCardController;
