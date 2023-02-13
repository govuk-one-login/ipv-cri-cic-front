const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const { formatDate } = require("../utils")
const { API } = require("../../../lib/config");

const DateController = DateControllerMixin(BaseController);

class CheckDetailsController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

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
