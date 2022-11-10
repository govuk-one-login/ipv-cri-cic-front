import { PATH_NAMES } from './app.constants';
import { AUTH_ROOT } from '../../../app.constants';
import {landingPage} from "./landingPageService";
import { accessibilityStatement } from "./accessibilityStatementService";
import { privacyStatement } from "./privacyStatementService";
import {selectPhotoId, validateSelectPhotoId} from "./photoIdSelection";

export const cicRoutes = {
  [`${AUTH_ROOT}${PATH_NAMES.LANDING_PAGE}`]: { "GET": landingPage },
  [`${AUTH_ROOT}${PATH_NAMES.PHOTO_ID_SELECTION}`]: { "GET": selectPhotoId, "POST": validateSelectPhotoId },
  [`${PATH_NAMES.PRIVACY_STATEMENT}`]: { "GET": privacyStatement },
  [`${PATH_NAMES.ACCESSIBILITY_STATEMENT}`]: { "GET": accessibilityStatement }
}