import wizard from "hmpo-form-wizard";
import { config } from "../../../lib/config.js";
import { createPersonalDataHeaders } from "@govuk-one-login/frontend-passthrough-headers";

export class JourneyTypeController extends wizard.Controller {
  async saveValues(req, res, next) {
    const tokenId = req.session.tokenId;

    if (tokenId) {
      try {
        const { data } = await req.axios.get(
          `${config.API.PATHS.SESSION_CONFIG}`,
          {
            headers: {
              "x-govuk-signin-session-id": tokenId,
              ...createPersonalDataHeaders(
                `${config.API.BASE_URL}${config.API.PATHS.SESSION_CONFIG}`,
                req,
              ),
            },
          },
        );
        req.sessionModel.set("journeyType", data.journey_type);
        return next();
      } catch (error) {
        console.log("Error fetching journey type", error);
        return next(error);
      }
    } else {
      console.error("Missing sessionID, redirecting to /error");
      res.redirect("/error");
    }
  }
}
