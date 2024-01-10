const BaseController = require("hmpo-form-wizard").Controller;

class NameEntryController extends BaseController {
  locals(req, res, callback) {
      super.locals(req, res, (err, locals) => {
      const journeyType = req.sessionModel.get("journeyType");
      locals.journeyType = journeyType;

      callback(err, locals);
    });
  }
}

module.exports = NameEntryController; 
