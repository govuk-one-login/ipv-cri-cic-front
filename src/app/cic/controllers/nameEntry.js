const BaseController = require("hmpo-form-wizard").Controller;
const {APP} = require("../../../lib/config");

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

    next() {
      return APP.PATHS.DATE_OF_BIRTH
    } 
}
module.exports = NameEntryController; 
