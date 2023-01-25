const moment = require('moment');
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

      const isOutsideExpireWindow = inputDate.utc().isBetween(  
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 1
        )
        .toISOString()
        .split("T")[0],
        
        new Date(
          new Date().getFullYear() + 75,
          new Date().getMonth(),
          new Date().getDate() + 1
        )
          .toISOString()
          .split("T")[0]
      )
        
      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("expiryDate", euIdCardExpiryDate);
      req.sessionModel.set("photoIdChoice", "EU Identity Card");
      req.sessionModel.set("changeUrl", "euIdentityCardDetails");
      
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
module.exports = EuIdentityCardController;
