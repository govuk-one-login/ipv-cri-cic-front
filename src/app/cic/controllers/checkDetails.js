const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const { formatDate } = require("../utils")
const { APP, API } = require("../../../lib/config");

const DateController = DateControllerMixin(BaseController);

class CheckDetailsController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      // Value for document expiry date depends on selected document
      let expiryDate
      switch(req.form.values.photoIdChoice) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          expiryDate = req.form.values.passportExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.BRP: {
          expiryDate = req.form.values.brpExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL: {
          expiryDate = req.form.values.photocardDlExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT: {
          expiryDate = req.form.values.nonUKPassportExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL: {
          expiryDate = req.form.values.euPhotocardDlExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.CITIZEN_CARD: {
          expiryDate = req.form.values.citizenCardExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD: {
          expiryDate = req.form.values.youngScotNationalEntitlementCardExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD: {
          expiryDate = req.form.values.euIdCardExpiryDate;
          break;
        }
      }

      const idChoice = req.sessionModel.get("selectedDocument");
      const dateOfBirth = req.form.values.dateOfBirth;
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

      if(locals.formattedExpiryDate){
        req.sessionModel.set("expiryDate", expiryDate);
      }

      callback(err, locals);
    });
  }

  next() {
    return '/done'
  }

  async saveValues(req, res, callback) {

    try {
      const fullNameVal = req.sessionModel.get("middleName")? req.sessionModel.get("firstName") + " "+ req.sessionModel.get("middleName") + " "+ req.sessionModel.get("surname"):
        req.sessionModel.get("firstName") +  " "+ req.sessionModel.get("surname")
      const cicData ={
        fullName: `${fullNameVal}`,
        dateOfBirth: req.sessionModel.get("dateOfBirth"),
        documentSelected:  req.sessionModel.get("photoIdChoice"),
        dateOfExpiry: req.sessionModel.get("expiryDate")
      }
      await this.saveCicData(req.axios, cicData, req);
      callback();

    } catch (err) {
      callback(err);
    }

  }

  async saveCicData(axios, cicData, req) {

    const headers = {
      "session-id": req.session.tokenId,
      session_id: req.session.tokenId,
    }

    const resp = await axios.post(`${API.PATHS.SAVE_CICDATA}`, cicData, {
      headers,
    });
    return resp.data;
  }
}

module.exports = CheckDetailsController;
