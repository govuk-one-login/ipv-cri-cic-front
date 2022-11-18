import { randomBytes } from "crypto";

module.exports = {
  generateNonce: function generateNonce() {
    return randomBytes(16).toString("hex");
  },
};
