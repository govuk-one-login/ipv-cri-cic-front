const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const userClaims = {
  "Authenticatable Anita": require("../support/shared_claim_f2f"),
  "Validating Valerie": require("../support/shared_claim_bav"),
  "a Low Confidence user": require("../support/shared_claim_low_confidence"),
};

class CustomWorld {
  constructor() {
    this.allUserClaims = userClaims;
  }
}

setWorldConstructor(CustomWorld);
