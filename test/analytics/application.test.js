const { expect } = require("chai");

describe("Init", () => {
  let events;

  beforeEach(async () => {
    events = [];
    global.window = {
      GOVUKFrontend: {
        initAll: () => "init",
      },
      GOVSignIn: {
        Cookies: () => {
          return {
            hasConsentForAnalytics: () => true,
            initAnalytics: () => events.push("init existing analytics"),
            cookieBannerInit: () => events.push("init existing cookie banner"),
          };
        },
      },
      DI: {
        cookieBannerInit: () => events.push("init new cookie banner"),
        loadAnalytics: () => events.push("init new analytics"),
      },
    };
    require("../../src/assets/javascripts/application");
  });

  afterEach(() => {
    delete require.cache[
      require.resolve("../../src/assets/javascripts/application")
    ];
  });

  describe("When GA4 is enabled", () => {
    const isGa4Enabled = "true";

    it("Initialises cookie banner and loads analytics per new implementation", () => {
      global.window.DI.appInit({
        uaContainerId: "uaContainerId",
        domain: "domain",
        isGa4Enabled,
        gtmContainerId: "gtmContainerId",
      });
      expect(events.length).to.equal(2);
      expect(events).to.include("init new analytics");
      expect(events).to.include("init new cookie banner");
    });
  });

  describe("When GA4 is not enabled", () => {
    const isGa4Enabled = false;

    describe("When user has given consent to analytics cookies", () => {
      it("Initialises analytics and cookie banner per existing implementation", () => {
        global.window.DI.appInit({
          uaContainerId: "uaContainerId",
          domain: "domain",
          isGa4Enabled,
          gtmContainerId: "gtmContainerId",
        });
        expect(events.length).to.equal(2);
        expect(events).to.include("init existing analytics");
        expect(events).to.include("init existing cookie banner");
      });
    });

    describe("When user has not given consent to analytics cookies", () => {
      it("Initialises cookie banner only per existing implementation", () => {
        global.window.GOVSignIn.Cookies = () => {
          return {
            hasConsentForAnalytics: () => false,
            initAnalytics: () => events.push("init existing analytics"),
            cookieBannerInit: () => events.push("init existing cookie banner"),
          };
        };

        global.window.DI.appInit({
          uaContainerId: "uaContainerId",
          domain: "domain",
          isGa4Enabled,
          gtmContainerId: "gtmContainerId",
        });
        expect(events.length).to.equal(1);
        expect(events).to.include("init existing cookie banner");
      });
    });
  });
});
