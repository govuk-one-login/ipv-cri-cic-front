const { APP } = require("../../../lib/config");
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
      req.sessionModel.set(
        APP.PHOTO_ID_OPTIONS.EEA_PERMANENT_RESIDENCY_CARD,
        undefined
      );
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.CITIZEN_CARD, undefined);
      req.sessionModel.set(
        APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD,
        undefined
      );
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD, undefined);

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

        case APP.PHOTO_ID_OPTIONS.EEA_PERMANENT_RESIDENCY_CARD: {
          logger.info(
            "photo-id-selection: user has selected EEA PR Card - redirecting to EEA PR card details page",
            { req, res }
          );
          req.sessionModel.set(
            APP.PHOTO_ID_OPTIONS.EEA_PERMANENT_RESIDENCY_CARD,
            true
          );
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL: {
          logger.info(
            "photo-id-selection: user has selected EU photocard driving licence - redirecting to driving license details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL, true);
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.CITIZEN_CARD: {
          logger.info(
            "photo-id-selection: user has selected CitizenCard - redirecting to CitizenCard details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.CITIZEN_CARD, true);
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD: {
          logger.info(
            "photo-id-selection: user has selected Young Scot NEC - redirecting to NEC details page",
            { req, res }
          );
          req.sessionModel.set(
            APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD,
            true
          );
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD: {
          logger.info(
            "photo-id-selection: user has selected EU ID Card - redirecting to EU ID Card details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD, true);
          return next();
        }
      }
      logger.info("photo-id-selection: Invalid action " + action);
      return next(new Error("photo-id-selection: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = PhotoIdSelectionController;
