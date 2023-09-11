const { APP } = require("./config");

module.exports = {
  setLocals: function (req, res, next) {
    res.locals.uaContainerId = APP.ANALYTICS.ID;
    res.locals.ga4ContainerId = APP.ANALYTICS.GTM_ID_GA4;
    res.locals.analyticsCookieDomain = APP.ANALYTICS.DOMAIN;

    // Patch the status code setter to make it available in locals as well
    const setStatusCode = res.status;
    res.status = function (code) {
      res.locals.statusCode = code;
      return setStatusCode.call(res, code);
    };

    next();
  },
};
