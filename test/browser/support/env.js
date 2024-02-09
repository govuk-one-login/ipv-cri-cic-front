const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const userClaims = {
  "Authenticatable Anita": require("../support/shared_claim_f2f"),
  "Erroring Ethem": {},
  "Not Authenticatable Neil": {},
  "Validating Valerie": require("../support/shared_claim_bav"),
};

class CustomWorld {
  constructor() {
    this.allUserClaims = userClaims;
  }
}

setWorldConstructor(CustomWorld);
