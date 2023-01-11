const moment = require('moment');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class EuPhotocardDlController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.euPhotocardDlExpiryDate = req.sessionModel.get("euPhotocardDlExpiryDate");

      callback(err, locals);
    });
  }

  async saveValues(req, res, next) {
    try {
      const euPhotocardDlExpiryDate = req.form.values.euPhotocardDlExpiryDate;
      const inputDate = moment(euPhotocardDlExpiryDate, 'YYYY-MM-DD');

      const isOutsideExpireWindow = inputDate.isAfter(  new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
        .toISOString()
        .split("T")[0],'days')

      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("euPhotocardDlExpiryDate", euPhotocardDlExpiryDate);

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
module.exports = EuPhotocardDlController;