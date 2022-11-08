import { PATH_NAMES } from './app.constants';
import { AUTH_ROOT } from '../../../app.constants';
import {criLandingPage} from "./criLandingPageService";

export const f2fRoutes = {
  [`${AUTH_ROOT}${PATH_NAMES.CRI_LANDING_PAGE}`]: { "GET": criLandingPage }
}