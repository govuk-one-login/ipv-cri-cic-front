import express from "express";
const wizard = require("hmpo-form-wizard");

import { JOURNEYS } from "./steps";
import { FIELDS } from "./fields";

const router = express.Router();

const wizardOptions = {
  name: "cic-front",
  journeyName: "cic",
  templatePath: "cic",
};

router.use(wizard(JOURNEYS, FIELDS, wizardOptions));

module.exports = router;
