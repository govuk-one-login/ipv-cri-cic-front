const moment = require('moment');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const {APP} = require("../../../lib/config");

const DateController = DateControllerMixin(BaseController);

class YoungScotNationalEntitlementCardDetailsController extends DateController {}

module.exports = YoungScotNationalEntitlementCardDetailsController;
