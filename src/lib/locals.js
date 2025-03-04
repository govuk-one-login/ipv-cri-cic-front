//Extracted from common-express and modified

module.exports = {
  setGTM: ({
    app,
    ga4ContainerId,
    uaContainerId,
    analyticsCookieDomain,
    ga4Enabled,
  }) => {
    app.set("APP.GTM.GA4_ID", ga4ContainerId);
    app.set("APP.GTM.UA_ID", uaContainerId);
    app.set("APP.GTM.GA4_ENABLED", ga4Enabled);
    app.set("APP.GTM.ANALYTICS_COOKIE_DOMAIN", analyticsCookieDomain);
  },

  getGTM: function (req, res, next) {
    res.locals.ga4ContainerId = req.app.get("APP.GTM.GA4_ID");
    res.locals.uaContainerId = req.app.get("APP.GTM.UA_ID");
    res.locals.ga4Enabled = req.app.get("APP.GTM.GA4_ENABLED");
    res.locals.analyticsCookieDomain = req.app.get(
      "APP.GTM.ANALYTICS_COOKIE_DOMAIN",
    );
    next();
  },
};
