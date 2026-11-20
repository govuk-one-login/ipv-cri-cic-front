const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("@govuk-one-login/frontend-ui").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class DateOfBirthController extends DateController {
  _padYear(value) {
    return value;
  }
}
module.exports = DateOfBirthController;
