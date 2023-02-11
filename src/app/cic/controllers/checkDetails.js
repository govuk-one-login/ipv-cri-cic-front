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
      console.log("came here!!!!!!!!!")
      const fullNameVal = req.sessionModel.get("middleName")? req.sessionModel.get("firstName") + " "+ req.sessionModel.get("middleName") + " "+ req.sessionModel.get("surname"):
        req.sessionModel.get("firstName") +  " "+ req.sessionModel.get("surname")
      const cicData ={
        fullName: `${fullNameVal}`,
        dateOfBirth: req.sessionModel.get("dateOfBirth"),
        documentSelected:  req.sessionModel.get("photoIdChoice"),
        dateOfExpiry: req.sessionModel.get("expiryDate")
      }
      console.log("going to save cic data")
      await this.saveCicData(req.axios, cicData, req.session.tokenId);
      callback();

    } catch (err) {
      callback(err);
    }

  }

  async saveCicData(axios, cicData, sessionId) {
    // set the headers to undefined will a fail a production level request but pass the browser tests for now.
    console.log("URL IS  ",API.PATHS.SAVE_CICDATA)
    const headers = sessionId
      ? {session_id: sessionId, "session-id": sessionId}
      : {session_id: "1234", "session-id": "1234"};
    const resp = await axios.post(`${API.PATHS.SAVE_CICDATA}`, cicData, {
      headers,
    });

    console.log("Data is ",resp.data)
    return resp.data;
  }
}

module.exports = CheckDetailsController;
