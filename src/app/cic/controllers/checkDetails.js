const BaseController = require("hmpo-form-wizard").Controller;
const moment = require('moment');
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class CheckDetailsController extends DateController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.dateOfBirth = req.sessionModel.get("dateOfBirth");

      callback(err, locals);
    });
  }
}

module.exports = CheckDetailsController;