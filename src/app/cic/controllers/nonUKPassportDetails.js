const moment = require('moment');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

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
       .toISOString()
       //.split("T")[0];
 
       //Upper limit for date input  
       const upperUTC = new Date(
         new Date().getFullYear() + 75,
         new Date().getMonth(),
         new Date().getDate()
       )
        .toISOString()
        //.split("T")[0];
       
       // Compare user input between upper and lower limits
       const isOutsideExpireWindow = inputDateUTC.isBetween(  
         lowerUTC, upperUTC,'days','[]'
       )

      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("expiryDate", nonUKPassportExpiryDate);
      req.sessionModel.set("photoIdChoice", "Non-UK Passport");
      req.sessionModel.set("changeUrl", "nonUKPassportDetails");

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
module.exports = NonUKPassportDetailsController;
