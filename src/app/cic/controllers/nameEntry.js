const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

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

    next(req) {
      return "/dateOfBirth"
    } 
}
module.exports = NameEntryController; 
