const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const DateController = DateControllerMixin(BaseController);
const {APP} = require("../../../lib/config");

class DateOfBirthController extends DateController {}
module.exports = DateOfBirthController; 
