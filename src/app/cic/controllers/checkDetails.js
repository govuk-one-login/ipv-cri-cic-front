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
      const expiryDate = req.form.values.passportExpiryDate;
      locals.formattedBirthDate = this.formatDate(dateOfBirth)
      locals.formattedExpiryDate = this.formatDate(expiryDate)
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
    console.log(req.form.values)
    return '/done'
  }
}



module.exports = CheckDetailsController;
