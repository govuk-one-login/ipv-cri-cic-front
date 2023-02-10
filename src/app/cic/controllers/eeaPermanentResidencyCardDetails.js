const moment = require("moment");
const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const DateController = DateControllerMixin(BaseController);

class EeaPermanentResidencyCardController extends DateController {}
module.exports = EeaPermanentResidencyCardController;
