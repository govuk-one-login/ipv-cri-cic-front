import wizard from "hmpo-form-wizard";
import { mixins } from "@govuk-one-login/frontend-ui";

const DateController = mixins.Date(wizard.Controller);

export class DateOfBirthController extends DateController {
  _padYear(value) {
    return value;
  }
}
