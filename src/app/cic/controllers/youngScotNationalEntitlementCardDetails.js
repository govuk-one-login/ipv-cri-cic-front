const moment = require('moment');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class YoungScotNationalEntitlementCardDetailsController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.youngScotNationalEntitlementCardExpiryDate = req.sessionModel.get("youngScotNationalEntitlementCardExpiryDate");

      callback(err, locals);
    });
  }

  async saveValues(req, res, next) {
    try {
      const youngScotNationalEntitlementCardExpiryDate = req.form.values.youngScotNationalEntitlementCardExpiryDate;
      const inputDate = moment(youngScotNationalEntitlementCardExpiryDate, 'YYYY-MM-DD');

      const isOutsideExpireWindow = inputDate.isAfter(  new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
        .toISOString()
        .split("T")[0],'days')

      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("expiryDate", youngScotNationalEntitlementCardExpiryDate);
      req.sessionModel.set("photoIdChoice", "Young Scot National Entitlement Card (NEC)");
      req.sessionModel.set("changeUrl", "youngScotNecDetails");

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
module.exports = YoungScotNationalEntitlementCardDetailsController;
