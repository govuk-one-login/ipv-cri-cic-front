const moment = require('moment');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const DateController = DateControllerMixin(BaseController);
const {APP} = require("../../../lib/config");


class CitizenCardController extends DateController {}

module.exports = CitizenCardController;
