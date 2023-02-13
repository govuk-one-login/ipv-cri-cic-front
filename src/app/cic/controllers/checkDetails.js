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

      switch (action) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          req.sessionModel.set("selectedDocument", "UK passport");
          req.sessionModel.set("changeUrl", "passportDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.BRP: {
          req.sessionModel.set("selectedDocument", "Biometric residence permit (BRP)");
          req.sessionModel.set("changeUrl", "brpDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL: {
          req.sessionModel.set("selectedDocument", "UK photocard driving licence");
          req.sessionModel.set("changeUrl", "photocardDlDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT: {
          req.sessionModel.set("selectedDocument", "Non-UK passport");
          req.sessionModel.set("changeUrl", "nonUKPassportDetails");
          return next();
        }

        case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL: {
          req.sessionModel.set("selectedDocument", "EU photocard driving licence");
          req.sessionModel.set("changeUrl", "euPhotocardDlDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.CITIZEN_CARD: {
          req.sessionModel.set("selectedDocument", "CitizenCard");
          req.sessionModel.set("changeUrl", "citizenCardDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD: {
          req.sessionModel.set("selectedDocument", "Young Scot National Entitlement Card (NEC)");
          req.sessionModel.set("changeUrl", "youngScotNecDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD: {
          req.sessionModel.set("selectedDocument", "EU photocard driving licence");
          req.sessionModel.set("changeUrl", "euPhotocardDlDetails");
          return next();
        }
      }


      const euIdCardExpiryDate = req.form.values.euIdCardExpiryDate;

      const dateOfBirth = req.form.values.dateOfBirth;
      const expiryDate = req.sessionModel.get("expiryDate");
      const idChoice = req.sessionModel.get("selectedDocument");
      const changeUrl = req.sessionModel.get("changeUrl");
      const firstName = req.sessionModel.get("firstName");
      const middleName = req.sessionModel.get("middleName");
      const surname = req.sessionModel.get("surname")
      const fullName = firstName + " " + middleName + " " + surname
      
      locals.formattedBirthDate = formatDate(dateOfBirth, "YYYY-MM-DD");
      locals.formattedExpiryDate = formatDate(expiryDate, "YYYY-MM-DD");
      locals.idChoice = idChoice;
      locals.changeUrl = `/${changeUrl}`;
      locals.fullName = fullName

      callback(err, locals);
    });
  }

  next() {
    return '/done'
  }
}

module.exports = CheckDetailsController;
