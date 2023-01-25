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
      //User input 
      const euPhotocardDlExpiryDate = req.form.values.euPhotocardDlExpiryDate;
      const inputDate = moment(euPhotocardDlExpiryDate, 'YYYY-MM-DD');
      const inputDateUTC = inputDate.utc()

      // Lower limit for date input
      const lowerUTC = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
      .toISOString()
      .split("T")[0];

      //Upper limit for date input  
      const upperUTC = new Date(
        new Date().getFullYear() + 75,
        new Date().getMonth(),
        new Date().getDate()
      )
        .toISOString()
        .split("T")[0];
      
      // Compare user input between upper and lower limits
      const isOutsideExpireWindow = inputDateUTC.isBetween(  
        lowerUTC, upperUTC,'days','[]'
      )

      req.sessionModel.set("isOutsideExpireWindow", isOutsideExpireWindow);
      req.sessionModel.set("expiryDate", euPhotocardDlExpiryDate);
      req.sessionModel.set("photoIdChoice", "EU photocard driving licence");
      req.sessionModel.set("changeUrl", "euPhotocardDlDetails");

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
