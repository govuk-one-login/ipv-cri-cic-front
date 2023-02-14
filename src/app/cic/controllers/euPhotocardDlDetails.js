const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class EuPhotocardDlController extends DateController {}

module.exports = EuPhotocardDlController;
