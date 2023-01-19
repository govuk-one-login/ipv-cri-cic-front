const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const { formatDate } = require("../utils")

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
      const changeUrl = req.sessionModel.get("changeUrl");
      
      locals.formattedBirthDate = formatDate(dateOfBirth);
      locals.formattedExpiryDate = formatDate(expiryDate);
      locals.idChoice = idChoice;
      locals.changeUrl = `/${changeUrl}`;

      callback(err, locals);
    });
  }

  next() {
    return '/done'
  }
}

module.exports = CheckDetailsController;
