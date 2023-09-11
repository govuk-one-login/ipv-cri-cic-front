/* global document window dataLayer ga */

"use strict";

const cookies = function (trackingId, analyticsCookieDomain) {
  const COOKIES_PREFERENCES_SET = "cookies_preferences_set";
  const cookiesAccepted = document.querySelector("#cookies-accepted");
  const cookiesRejected = document.querySelector("#cookies-rejected");
  const hideCookieBanner = document.querySelectorAll(".cookie-hide-button");
  const cookieBannerContainer = document.querySelector(".govuk-cookie-banner");
  const cookieBanner = document.querySelector("#cookies-banner-main");
  const acceptCookies = document.querySelector('button[name="cookiesAccept"]');
  const rejectCookies = document.querySelector('button[name="cookiesReject"]');

  function cookieBannerInit() {
    acceptCookies.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        setBannerCookieConsent(true);
      }.bind(this)
    );

    rejectCookies.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        setBannerCookieConsent(false);
      }.bind(this)
    );

    const hideButtons = Array.prototype.slice.call(hideCookieBanner);
    hideButtons.forEach(function (element) {
      element.addEventListener(
        "click",
        function (event) {
          event.preventDefault();
          hideElement(cookieBannerContainer);
        }.bind(this)
      );
    });

    const hasCookiesPolicy = getCookie(COOKIES_PREFERENCES_SET);
    if (!hasCookiesPolicy) {
      showElement(cookieBannerContainer);
    } 
  }

  function setBannerCookieConsent(analyticsConsent) {
    setCookie(
      COOKIES_PREFERENCES_SET,
      { analytics: analyticsConsent },
      { days: 365 }
    );

    hideElement(cookieBanner);

    if (analyticsConsent) {
      showElement(cookiesAccepted);
      initAnalytics();
    } else {
      showElement(cookiesRejected);
    }
  }

  function hasConsentForAnalytics() {
    const cookieConsent = JSON.parse(decodeURIComponent(getCookie(COOKIES_PREFERENCES_SET)));
    return cookieConsent ? cookieConsent.analytics : false;
  }

  function initAnalytics() {
    loadGtmScript();
    initGtm();
    initLinkerHandlers();
  }

  function loadGtmScript() {
    const gtmScriptTag = document.createElement("script");
    gtmScriptTag.type = "text/javascript";
    gtmScriptTag.setAttribute("async", "true");
    gtmScriptTag.setAttribute(
      "src",
      "https://www.googletagmanager.com/gtm.js?id=" + trackingId
    );
    gtmScriptTag.setAttribute('crossorigin', 'anonymous');
    document.documentElement.firstChild.appendChild(gtmScriptTag);
  }

  function initGtm() {
    window.dataLayer = [
      {
        "gtm.allowlist": ["google"],
        "gtm.blocklist": ["adm", "awct", "sp", "gclidw", "gcs", "opt"],
      }
    ];

    const sessionJourney = getJourneyMapping(window.location.pathname);

    function gtag(obj) {
      dataLayer.push(obj);
    }

    if (sessionJourney) {
      gtag(sessionJourney);
    }

    gtag({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  }

  function initLinkerHandlers() {
    const submitButton = document.querySelector('button[type="submit"]');
    const pageForm = document.getElementById("form-tracking");

    if (submitButton && pageForm) {
      submitButton.addEventListener("click", function () {
        if (window.ga && window.gaplugins) {
          const tracker = ga.getAll()[0];
          const linker = new window.gaplugins.Linker(tracker);
          const destinationLink = linker.decorate(pageForm.action);
          pageForm.action = destinationLink;
        }
      });
    }

    const trackLink = document.getElementById("track-link");

    if (trackLink) {
      trackLink.addEventListener("click", function (e) {
        e.preventDefault();

        if (window.ga && window.gaplugins) {
          const tracker = ga.getAll()[0];
          const linker = new window.gaplugins.Linker(tracker);
          const destinationLink = linker.decorate(trackLink.href);
          window.location.href = destinationLink;
        } else {
          window.location.href = trackLink.href;
        }
      });
    }
  }

  function generateSessionJourney(journey, status) {
    return {
      sessionjourney: {
        journey: journey,
        status: status,
      },
    };
  }

  function getJourneyMapping(url) {
    const JOURNEY_DATA_LAYER_PATHS = {
      "/authorize": generateSessionJourney("authorize", "start"),
      "/callback": generateSessionJourney("authorize", "end"),
      "/finishBiometricCheck": generateSessionJourney("authorize", "end"),
      "/flashingWarning": generateSessionJourney("authorize", "middle"),
      "/validDrivingLicence": generateSessionJourney("authorize", "middle"),
      "/workingCamera": generateSessionJourney("authorize", "middle"),
      "/readyCheck": generateSessionJourney("authorize", "middle"),
      "/downloadApp": generateSessionJourney("authorize", "middle"),
      "/abort": generateSessionJourney("authorize", "end"),
      "/simpleDevice": generateSessionJourney("authorize", "end"),
    };

    return JOURNEY_DATA_LAYER_PATHS[url];
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0, len = cookies.length; i < len; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  }

  function setCookie(name, values, options) {
    if (typeof options === "undefined") {
      options = {};
    }

    let cookieString = `${name}=${encodeURIComponent(JSON.stringify(values))}`
    if (options.days) {
      const date = new Date();
      date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
      cookieString = `${cookieString}; Expires=${date.toUTCString()}; Path=/; Domain=${analyticsCookieDomain}`
    }    

    if (document.location.protocol === "https:") {
      cookieString = `${cookieString}; Secure`
    }

    document.cookie = cookieString
  }

  function hideElement(el) {
    el.style.display = "none";
  }

  function showElement(el) {
    el.style.display = "block";
  }

  return {
    cookieBannerInit,
    hasConsentForAnalytics,
    initAnalytics,
  };
};

window.GOVUKFrontend = window.GOVUKFrontend || {};
window.GOVUKFrontend.Cookies = cookies;
