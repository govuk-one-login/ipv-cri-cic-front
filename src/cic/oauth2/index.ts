import express from "express";
import {AUTH_ROOT, PATH_NAMES} from "../../app.constants";

const router = express.Router();

const {
  verifyRequest,
  retrieveAuthorizationCode,
  abortSession,
  redirect,
  setFeatureFlagCookie,
} = require("./middleware");

router.get(`${AUTH_ROOT}${PATH_NAMES.AUTHORIZE}`, verifyRequest);
router.get(`${AUTH_ROOT}${PATH_NAMES.ABORT_SESSION}`, abortSession);
router.get(`${AUTH_ROOT}${PATH_NAMES.CALLBACK}`, retrieveAuthorizationCode);
router.get(`${AUTH_ROOT}${PATH_NAMES.REDIRECT}`, redirect);
router.get(`${AUTH_ROOT}${PATH_NAMES.FEATURE_FLAG_COOKIE}`, setFeatureFlagCookie);

export {router as oauthRouter}
