const BaseController = require("hmpo-form-wizard").Controller;

class NameEntryController extends BaseController {
  locals(req, res, callback) {
      super.locals(req, res, (err, locals) => {
      const journeyType = req.sessionModel.get("journeyType");
      locals.title = req.translate(`nameEntry.${journeyType}.title`);

      callback(err, locals);
    });
  }
}

module.exports = NameEntryController; 
