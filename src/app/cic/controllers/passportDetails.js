const moment = require('moment');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const {APP} = require("../../../lib/config");

const DateController = DateControllerMixin(BaseController);

class PassportDetailsController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.passportExpiryDate = req.sessionModel.get("passportExpiryDate");

      callback(err, locals);
    });
  }

  async saveValues(req, res, next) {
    try {
      const passportExpiryDate = req.form.values.passportExpiryDate;
      const inputDate = moment(passportExpiryDate, 'YYYY-MM-DD');

      const isOutsideExpireWindow = inputDate.isAfter(  new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 18,
        new Date().getDate()
      )
        .toISOString()
        .split("T")[0],'days')

      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("passportExpiryDate", passportExpiryDate);

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
module.exports = PassportDetailsController;
