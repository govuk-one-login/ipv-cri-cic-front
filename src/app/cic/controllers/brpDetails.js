const moment = require("moment");
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

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
        .toISOString()
        //.split("T")[0];
         
      //Upper limit for date input  
      const upperUTC = new Date("2024-12-31")
      .toISOString()
      //.split("T")[0];

      // Compare user input between upper and lower limits
      const isOutsideExpireWindow = inputDateUTC.isBetween(  
        lowerUTC, upperUTC,'days','[]'
      )
    
    req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
    req.sessionModel.set("expiryDate", brpExpiryDate);
    req.sessionModel.set("photoIdChoice", "Biometric residence permit (BRP)");
    req.sessionModel.set("changeUrl", "brpDetails");

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
module.exports = BrpDetailsController;
