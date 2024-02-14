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
      const journeyType = req.sessionModel.get("journeyType");
      const dateOfBirth = req.form.values.dateOfBirth;
      const changeUrl = req.sessionModel.get("changeUrl");
      const firstName = req.sessionModel.get("firstName");
      const middleName = req.sessionModel.get("middleName");
      const surname = req.sessionModel.get("surname")
      const fullName = firstName + " " + middleName + " " + surname
      const language = req.lng
      
      locals.journeyType = journeyType;
      locals.formattedBirthDate = formatDate(dateOfBirth, language);
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
      const givenNamesVal = req.sessionModel.get("middleName")? req.sessionModel.get("firstName") + " "+ req.sessionModel.get("middleName") :
        req.sessionModel.get("firstName");
      const cicData ={
        given_names: `${givenNamesVal}`,
        family_names: req.sessionModel.get("surname"),
        date_of_birth: req.sessionModel.get("dateOfBirth"),
      }
      await this.saveCicData(req.axios, cicData, req);
      callback();

    } catch (err) {
      callback(err);
    }

  }

  async saveCicData(axios, cicData, req) {

    const headers = {
      "x-govuk-signin-session-id": req.session.tokenId
    }

    const resp = await axios.post(`${API.PATHS.SAVE_CICDATA}`, cicData, {
      headers,
    });
    return resp.data;
  }
}

module.exports = CheckDetailsController;
