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
      //User input 
      const passportExpiryDate = req.form.values.passportExpiryDate;
      const inputDate = moment(passportExpiryDate, 'YYYY-MM-DD');
      const inputDateUTC = inputDate.utc();

      // Lower limit for date input
      const lowerUTC = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 18,
        new Date().getDate()
      )
      .toISOString();

      //Upper limit for date input  
      const upperUTC = new Date(
        new Date().getFullYear() + 10,
        new Date().getMonth(),
        new Date().getDate()
      )
      .toISOString();
      
      // Compare user input between upper and lower limits
      const isOutsideExpireWindow = inputDateUTC.isBetween(  
        lowerUTC, upperUTC,'days','[]'
      )

      // Values used on this page  
      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("passportExpiryDate", passportExpiryDate);
      //Values used on checkDetails page
      req.sessionModel.set("expiryDate", passportExpiryDate);
      req.sessionModel.set("photoIdChoice", "UK passport");
      req.sessionModel.set("changeUrl", "passportDetails");

      return next();
    } catch (err) {
      return next(err);
    }
  }
  
  // Redirect according to user input
  next(req) {
    if (req.sessionModel.get("isOutsideExpireWindow")) {
      return APP.PATHS.NAME_ENTRY
    } else{
      return APP.PATHS.EXPIRED_ID
    }
  }

}
module.exports = PassportDetailsController;
