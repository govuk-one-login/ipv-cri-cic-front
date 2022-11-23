const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

class PhotoIdSelectionController extends BaseController {
  async saveValues(req, res, next) {
    console.log("RICHAAAAA")
    try {
      logger.info("user submitting photo Id choice", { req, res });
      req.sessionModel.set("redirect_url", undefined);

      const action = req.form.values.photoIdChoice;
      req.sessionModel.set("photoIdChoice", action);

      switch (action) {
        case "ukPassport": {
          logger.info(
              "ukPassport: user has selected UK passport - redirecting to passport details page",
              { req, res }
          );
          req.sessionModel.set("ukPassport", true);
          return next();
        }
        case "DVLA": {
          logger.info(
              "licence-issuer: user selected DVLA : redirecting to driving licence details",
              {
                req,
                res,
              }
          );
          return next();
        }
        case "DVA": {
          logger.info(
              "licence-issuer: user selected DVA : redirecting to driving licence details",
              {
                req,
                res,
              }
          );
          return next();
        }
      }
      console.log("RICHAAAAAAAA")
      return next(new Error("licence-issuer: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }

  next(req) {
    console.log("HERRRRRRR");
    if (req.sessionModel.get("ukPassport")) {
      console.log("UK passportttt")
      return "/cic/passportDetails";
    } else {
      return "/done";
    }
  }
}

module.exports = PhotoIdSelectionController;





