import wizard from "hmpo-form-wizard";

export class NameEntryController extends wizard.Controller {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      const journeyType = req.sessionModel.get("journeyType");

      locals.journeyType = journeyType;
      locals.title = req.translate(`nameEntry.${journeyType}.title`);
      locals.introText = req.translate(`nameEntry.${journeyType}.introText`);
      locals.insetText1 = req.translate(`nameEntry.${journeyType}.insetText1`);
      locals.insetText2 = req.translate(`nameEntry.${journeyType}.insetText2`);

      callback(err, locals);
    });
  }
}
