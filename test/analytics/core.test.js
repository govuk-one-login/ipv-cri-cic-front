/* global window */

const { expect } = require("chai");

describe("Core", () => {
  beforeEach(async () => {
    global.window = {};
    window.dataLayer = [];

    require("../../src/assets/javascript/analytics/core");
  });

  afterEach(() => {
    delete require.cache[
      require.resolve("../../src/assets/javascript/analytics/core")
    ];
  });

  it("Sends data to the data layer", function () {
    global.window.DI.core.sendData({ foo: "bar" });
    expect(window.dataLayer[0]).to.deep.equal({ foo: "bar" });
  });

});
