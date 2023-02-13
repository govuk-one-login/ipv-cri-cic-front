const moment = require('moment');
const { APP } = require('../../../lib/config');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const DateController = DateControllerMixin(BaseController);

class EuIdentityCardController extends DateController {}

module.exports = EuIdentityCardController;
