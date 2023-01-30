const BaseController = require("hmpo-form-wizard").Controller;

class NameEntryController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.firstName = req.sessionModel.get("firstName");
      locals.surname = req.sessionModel.get("surname");

      callback(err, locals);
    });
  }
}
module.exports = NameEntryController;
