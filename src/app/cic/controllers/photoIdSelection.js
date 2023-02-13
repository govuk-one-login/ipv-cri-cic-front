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
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.CITIZEN_CARD, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID, undefined)

      const action = req.form.values.photoIdChoice;
      req.sessionModel.set("photoIdChoice", action);

      switch (action) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          logger.info(
              "photo-id-selection: user has selected UK passport - redirecting to passport details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PASSPORT, true);
          req.sessionModel.set("selectedDocument", "UK passport");
          req.sessionModel.set("changeUrl", "passportDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.BRP: {
          logger.info(
              "photo-id-selection: user has selected BRP - redirecting to BRP page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.BRP, true);
          req.sessionModel.set("selectedDocument", "Biometric residence permit (BRP)");
          req.sessionModel.set("changeUrl", "brpDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL: {
          logger.info(
              "photo-id-selection: user has selected UK DL - redirecting to driving license details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL, true);
          req.sessionModel.set("selectedDocument", "UK photocard driving licence");
          req.sessionModel.set("changeUrl", "photocardDlDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT: {
          logger.info(
              "photo-id-selection: user has selected other passport - redirecting to other passport details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT, true);
          req.sessionModel.set("selectedDocument", "Non-UK passport");
          req.sessionModel.set("changeUrl", "nonUKPassportDetails");
          return next();
        }

        case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL: {
          logger.info(
              "photo-id-selection: user has selected EU photocard driving licence - redirecting to driving license details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL, true);
          req.sessionModel.set("selectedDocument", "EU photocard driving licence");
          req.sessionModel.set("changeUrl", "euPhotocardDlDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.CITIZEN_CARD: {
          logger.info(
              "photo-id-selection: user has selected CitizenCard - redirecting to CitizenCard details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.CITIZEN_CARD, true);
          req.sessionModel.set("selectedDocument", "CitizenCard");
          req.sessionModel.set("changeUrl", "citizenCardDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD: {
          logger.info(
              "photo-id-selection: user has selected Young Scot NEC - redirecting to NEC details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD, true);
          req.sessionModel.set("selectedDocument", "Young Scot National Entitlement Card (NEC)");
          req.sessionModel.set("changeUrl", "youngScotNecDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD: {
          logger.info(
              "photo-id-selection: user has selected EU ID Card - redirecting to EU ID Card details page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD, true); 
          req.sessionModel.set("selectedDocument", "EU photocard driving licence");
          req.sessionModel.set("changeUrl", "euPhotocardDlDetails");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID: {
          logger.info(
              "photo-id-selection: user has selected No ID - redirecting to No ID page",
              { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID, true); 
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
