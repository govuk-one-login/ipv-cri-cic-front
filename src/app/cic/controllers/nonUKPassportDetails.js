const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class NonUKPassportDetailsController extends DateController {}

module.exports = NonUKPassportDetailsController;
