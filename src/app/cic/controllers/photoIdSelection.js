const {APP} = require("../../../lib/config");
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
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          logger.info(
              "photo-id-selection: user has selected UK passport - redirecting to passport details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PASSPORT, true);
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.BRP: {
          logger.info(
              "photo-id-selection: user has selected BRP - redirecting to BRP page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.BRP, true);
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL: {
          logger.info(
              "photo-id-selection: user has selected UK DL - redirecting to driving license details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL, true);
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT: {
          logger.info(
              "photo-id-selection: user has selected other passport - redirecting to other passport details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT, true);
          return next();
        }
      }
      console.log("RICHAAAAAAAA")
      return next(new Error("photo-id-selection: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }

  next(req) {
    console.log("HERRRRRRR");
    if (req.sessionModel.get(APP.PHOTO_ID_OPTIONS.UK_PASSPORT)) {
      console.log("UK passportttt")
      return APP.PATHS.CIC + APP.PATHS.PASSPORT_DETAILS
    } else if (req.sessionModel.get(APP.PHOTO_ID_OPTIONS.BRP)) {
      console.log("UK BRP")
      return APP.PATHS.CIC + APP.PATHS.BRP_DETAILS
    } else if (req.sessionModel.get(APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL)) {
      console.log("UK DL")
      return APP.PATHS.CIC + APP.PATHS.PHOTOCARD_DL_DETAILS
    } else if (req.sessionModel.get(APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT)) {
      console.log("other passport")
      return APP.PATHS.CIC + APP.PATHS.OTHER_PASSPORT_DETAILS
    } else {
      return "/done";
    }
  }
}

module.exports = PhotoIdSelectionController;





