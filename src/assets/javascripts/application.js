/* global window */
window.GOVUKFrontend.initAll()

window.DI = window.DI || {};

(function (DI) {

    'use strict'
  
    function appInit({analyticsCookieDomain, uaContainerId, isGa4Enabled, ga4ContainerId}) {
  
      if(isGa4Enabled === true) {
        // New analytics implementation (UA and GA4)
        window.DI.cookieBannerInit(analyticsCookieDomain)
        window.DI.loadAnalytics(uaContainerId, ga4ContainerId)
      } else {
        // Existing analytics implementation (UA only)
        const cookies = window.GOVUKFrontend.Cookies(uaContainerId, analyticsCookieDomain);
        if (cookies.hasConsentForAnalytics()) {
          cookies.initAnalytics();
        }
        cookies.cookieBannerInit();
      }
    }
  
    DI.appInit = appInit;
  })(window.DI);