const moment = require("moment");
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class BrpDetailsController extends DateController {

  async saveValues(req, res, next) {
    try {
      const brpExpiryDate = req.form.values.brpExpiryDate;
      const inputDate = moment(brpExpiryDate, 'YYYY-MM-DD');

      const isOutsideExpireWindow = inputDate.isAfter(  new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1
      )
        .toISOString()
        .split("T")[0],'days')
     
    // Values used on this page    
    req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
    req.sessionModel.set("brpExpiryDate", brpExpiryDate);
    //Values used on checkDetails page
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
