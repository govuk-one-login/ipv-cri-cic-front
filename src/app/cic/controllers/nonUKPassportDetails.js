const moment = require('moment');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const {APP} = require("../../../lib/config");

const DateController = DateControllerMixin(BaseController);

class NonUKPassportDetailsController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.nonUKPassportExpiryDate = req.sessionModel.get("nonUKPassportExpiryDate");

      callback(err, locals);
    });
  }

  async saveValues(req, res, next) {
    try {
       //User input 
       const nonUKPassportExpiryDate = req.form.values.nonUKPassportExpiryDate;
       const inputDate = moment(nonUKPassportExpiryDate, 'YYYY-MM-DD');
       const inputDateUTC = inputDate.utc()
 
       // Lower limit for date input
       const lowerUTC = new Date(
         new Date().getFullYear(),
         new Date().getMonth(),
         new Date().getDate()
       )
       .toISOString();
 
       //Upper limit for date input  
       const upperUTC = new Date(
         new Date().getFullYear() + 75,
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
      req.sessionModel.set("nonUKPassportExpiryDate", nonUKPassportExpiryDate);
      //Values used on checkDetails page
      req.sessionModel.set("expiryDate", nonUKPassportExpiryDate);

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
module.exports = NonUKPassportDetailsController;
