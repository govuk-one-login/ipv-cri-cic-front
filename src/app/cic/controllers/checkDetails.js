const moment = require("moment");
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class CheckDetailsController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      const dateOfBirth = req.form.values.dateOfBirth;
      const expiryDate = req.sessionModel.get("expiryDate");
      const idChoice = req.sessionModel.get("photoIdChoice");
      locals.formattedBirthDate = this.formatDate(dateOfBirth);
      locals.formattedExpiryDate = this.formatDate(expiryDate);
      locals.idChoice = idChoice;
      callback(err, locals);
    });
  }

  formatDate(date) {
    const datePart = date.match(/\d+/g),
    year = datePart[0].substring(0,4),
    month = datePart[1], day = datePart[2];
  
    return day + '-' + month + '-' + year
  }

  next(req) {
    
    // console.log("CHANGING")
    // console.log(req.session['hmpo-journey-cic'].history)
    // console.log("END OF LOG")
    // console.log("-------------------------------")
    return '/done'
  }
}



module.exports = CheckDetailsController;
