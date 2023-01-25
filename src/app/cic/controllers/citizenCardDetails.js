const moment = require('moment');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const DateController = DateControllerMixin(BaseController);

class CitizenCardController extends DateController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      locals.citizenCardExpiryDate = req.sessionModel.get("citizenCardExpiryDate");
      callback(err, locals);
    });
  }
  async saveValues(req, res, next) {
    try {
      const citizenCardExpiryDate = req.form.values.citizenCardExpiryDate;
      const inputDate = moment(citizenCardExpiryDate, 'YYYY-MM-DD');

      const isOutsideExpireWindow = inputDate.utc().isBetween(  
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 1
        )
        .toISOString()
        .split("T")[0],
      
        new Date(
          new Date().getFullYear() + 4,
          new Date().getMonth(),
          new Date().getDate() + 1
        )
        .toISOString()
        .split("T")[0]
      )
        
      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("expiryDate", citizenCardExpiryDate);
      req.sessionModel.set("photoIdChoice", "CitizenCard");
      req.sessionModel.set("changeUrl", "citizenCardDetails");

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
module.exports = CitizenCardController;
