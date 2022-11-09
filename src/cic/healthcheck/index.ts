import express from "express";
import { PATH_NAMES } from "../../app.constants";

const router = express.Router();

const { healthcheckGet } = require("./middleware");

router.get(PATH_NAMES.HEALTHCHECK, healthcheckGet);

module.exports = router;
