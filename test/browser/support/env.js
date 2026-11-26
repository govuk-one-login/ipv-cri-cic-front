import { setWorldConstructor } from "@cucumber/cucumber";
import AuthenticatableAnita from "./shared_claim_f2f.json" with { type: "json" };
import ValidatingValerie from "./shared_claim_bav.json" with { type: "json" };
import LowConfidenceUser from "./shared_claim_low_confidence.json" with { type: "json" };

const userClaims = {
  "Authenticatable Anita": AuthenticatableAnita,
  "Validating Valerie": ValidatingValerie,
  "a Low Confidence user": LowConfidenceUser,
};

class CustomWorld {
  constructor() {
    this.allUserClaims = userClaims;
  }
}

setWorldConstructor(CustomWorld);
