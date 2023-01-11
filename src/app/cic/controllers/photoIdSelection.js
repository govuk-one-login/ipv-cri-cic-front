const {APP} = require("../../../lib/config");
const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

class PhotoIdSelectionController extends BaseController {
  async saveValues(req, res, next) {
    try {
      logger.info("user submitting photo Id choice", { req, res });
      req.sessionModel.set("redirect_url", undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PASSPORT, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.BRP, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.CITIZEN_CARD, undefined);

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
        case APP.PHOTO_ID_OPTIONS.CITIZEN_CARD: {
          logger.info(
              "photo-id-selection: user has selected CitizenCard - redirecting to other passport details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.CITIZEN_CARD, true);
          return next();
        }
      }
      logger.info("photo-id-selection: Invalid action " + action);
      return next(new Error("photo-id-selection: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }

  next(req) {

    if (req.sessionModel.get(APP.PHOTO_ID_OPTIONS.UK_PASSPORT)) {
      return APP.PATHS.PASSPORT_DETAILS
    } else if (req.sessionModel.get(APP.PHOTO_ID_OPTIONS.BRP)) {
      return APP.PATHS.BRP_DETAILS
    } else if (req.sessionModel.get(APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL)) {
      return APP.PATHS.PHOTOCARD_DL_DETAILS
    } else if (req.sessionModel.get(APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT)) {
      return APP.PATHS.NON_UK_PASSPORT_DETAILS
    } else if (req.sessionModel.get(APP.PHOTO_ID_OPTIONS.CITIZEN_CARD)) {
      return APP.PATHS.CITIZEN_CARD_DETAILS
    }
  }
}

module.exports = PhotoIdSelectionController;
