const moment = require("moment");
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const {APP} = require("../../../lib/config");

const DateController = DateControllerMixin(BaseController);

class BrpDetailsController extends DateController {

  async saveValues(req, res, next) {
    try {
      //User input 
      const brpExpiryDate = req.form.values.brpExpiryDate;
      const inputDate = moment(brpExpiryDate, 'YYYY-MM-DD');
      const inputDateUTC = inputDate.utc()

      // Lower limit for date input
      const lowerUTC = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
        .toISOString();
         
      //Upper limit for date input  
      const upperUTC = new Date("2024-12-31")
      .toISOString();

      // Compare user input between upper and lower limits
      const isOutsideExpireWindow = inputDateUTC.isBetween(  
        lowerUTC, upperUTC,'days','[]'
      )
     
    // Values used on this page    
    req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
    req.sessionModel.set("brpExpiryDate", brpExpiryDate);
    //Values used on checkDetails page
    req.sessionModel.set("expiryDate", brpExpiryDate);
    req.sessionModel.set("selectedDocument", "Biometric residence permit (BRP)");
    req.sessionModel.set("changeUrl", "brpDetails");

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
module.exports = BrpDetailsController;
