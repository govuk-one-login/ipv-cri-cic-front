import { PATH_NAMES } from './app.constants';
import { AUTH_ROOT } from '../../../app.constants';
import {landingPage} from "./landingPageService";
import { accessibilityStatement } from "./accessibilityStatementService";
import { privacyStatement } from "./privacyStatementService";
import {selectPhotoId, validateSelectPhotoId} from "./photoIdSelection";
import {ukPassportDateOfExpiry} from "./passportExpiry";
import { nonUkPassportDateOfExpiry } from './nonUKPassportExpiry';
import {brpDateOfExpiry} from "./brpExpiry";
import { drivingLicenceExpiry } from './drivingLicenceExpiry';

export const cicRoutes = {
  [`${AUTH_ROOT}${PATH_NAMES.LANDING_PAGE}`]: { "GET": landingPage },
  [`${AUTH_ROOT}${PATH_NAMES.PHOTO_ID_SELECTION}`]: { "GET": selectPhotoId, "POST": validateSelectPhotoId },
  [`${AUTH_ROOT}${PATH_NAMES.PASSPORT_DETAILS}`]: { "GET": ukPassportDateOfExpiry },
  [`${AUTH_ROOT}${PATH_NAMES.BRP_DETAILS}`]: { "GET": brpDateOfExpiry },
  [`${AUTH_ROOT}${PATH_NAMES.PHOTOCARD_DL_DETAILS}`]: { "GET": drivingLicenceExpiry },
  [`${AUTH_ROOT}${PATH_NAMES.OTHER_PASSPORT_DETAILS}`]: { "GET": nonUkPassportDateOfExpiry},
  [`${PATH_NAMES.PRIVACY_STATEMENT}`]: { "GET": privacyStatement },
  [`${PATH_NAMES.ACCESSIBILITY_STATEMENT}`]: { "GET": accessibilityStatement }
}