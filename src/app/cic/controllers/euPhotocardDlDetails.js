const moment = require("moment");
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class EuPhotocardDlController extends DateController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.euPhotocardDlExpiryDate = req.sessionModel.get(
        "euPhotocardDlExpiryDate"
      );

      callback(err, locals);
    });
  }
}
module.exports = EuPhotocardDlController;
