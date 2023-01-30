const moment = require('moment');
const { APP } = require('../../../lib/config');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const DateController = DateControllerMixin(BaseController);

class EuIdentityCardController extends DateController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      locals.euIdCardExpiryDate = req.sessionModel.get("euIdCardExpiryDate");
      callback(err, locals);
    });
  }
  async saveValues(req, res, next) {
    try {
      const euIdCardExpiryDate = req.form.values.euIdCardExpiryDate;
      const inputDate = moment(euIdCardExpiryDate, 'YYYY-MM-DD');
      const isOutsideExpireWindow = inputDate.isAfter(  new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
        .toISOString()
        .split("T")[0],'months')
      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
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
module.exports = EuIdentityCardController;
