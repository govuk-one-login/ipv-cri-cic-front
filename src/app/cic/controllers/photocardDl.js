const moment = require('moment');
const { APP } = require('../../../lib/config');
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class PhotocardDlController extends DateController {}

module.exports = PhotocardDlController;
