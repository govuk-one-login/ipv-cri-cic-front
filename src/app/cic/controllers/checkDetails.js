import wizard from "hmpo-form-wizard";
import { mixins } from "@govuk-one-login/frontend-ui";
import { formatDate } from "../utils.js";
import { config } from "../../../lib/config.js";
import { createPersonalDataHeaders } from "@govuk-one-login/frontend-passthrough-headers";

const DateController = mixins.Date(wizard.Controller);

export class CheckDetailsController extends DateController {
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
      const surname = req.sessionModel.get("surname");
      const fullName = firstName + " " + middleName + " " + surname;
      const format = "YYYY-MM-DD";
      const language = req.lng;

      locals.journeyType = journeyType;
      locals.formattedBirthDate = formatDate(dateOfBirth, format, language);
      locals.changeUrl = `/${changeUrl}`;
      locals.fullName = fullName;

      callback(err, locals);
    });
  }

  next() {
    return "/done";
  }

  async saveValues(req, res, callback) {
    try {
      const givenNamesVal = req.sessionModel.get("middleName")
        ? req.sessionModel.get("firstName") +
          " " +
          req.sessionModel.get("middleName")
        : req.sessionModel.get("firstName");
      const cicData = {
        given_names: `${givenNamesVal}`,
        family_names: req.sessionModel.get("surname"),
        date_of_birth: req.sessionModel.get("dateOfBirth"),
      };
      await this.saveCicData(req.axios, cicData, req, res);
      callback();
    } catch (err) {
      callback(err);
    }
  }

  async saveCicData(axios, cicData, req, res) {
    const tokenId = req.session.tokenId;

    if (tokenId) {
      const resp = await axios.post(
        `${config.API.PATHS.SAVE_CICDATA}`,
        cicData,
        {
          headers: {
            "x-govuk-signin-session-id": tokenId,
            ...createPersonalDataHeaders(
              `${config.API.BASE_URL}${config.API.PATHS.SAVE_CICDATA}`,
              req,
            ),
          },
        },
      );
      return resp.data;
    } else {
      console.error("Missing sessionID, redirecting to /error");
      res.redirect("/error");
    }
  }
}
