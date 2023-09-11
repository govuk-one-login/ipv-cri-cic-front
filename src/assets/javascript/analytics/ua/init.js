/* global window document ga */

window.DI = window.DI || {}
window.DI.analyticsUa = window.DI.analyticsUa || {};

(function (analytics) {

  'use strict'

  function initGtm() {

    const sendData = window.DI.core.sendData

    sendData({
      "gtm.allowlist": ["google"],
      "gtm.blocklist": ["adm", "awct", "sp", "gclidw", "gcs", "opt"],
    })

    const gaDataElement = document.getElementById("gaData");

    const sessionJourney = getJourneyMapping(window.location.pathname);
    const criJourney = criDataLayer(
      gaDataElement ? gaDataElement.value : "undefined"
    );

    if (sessionJourney) {
      sendData(sessionJourney);
    }

    if (criJourney) {
      sendData(criJourney);
    }

    sendData({ "gtm.start": new Date().getTime(), event: "gtm.js" });
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

  function criDataLayer(criJourney = "undefined") {
    // cri_journey is the only field to change at the moment
    // it is based off the docType cookie bound to a hidden element on specific pages, and so if that element isn't there, it will be 'undefined'. If it is there, the values will be boolean as a string
    return {
      event: "page_view",
      page: {
        cri_type: "document checking online",
        cri_journey: criJourney,
        organisations: "DI",
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

  const init = function() {

    const consentGiven = window.DI.cookies.hasConsentForAnalytics()

    if (consentGiven) {
      window.DI.core.load(window.DI.analytics.vars.uaContainerId)
      initGtm()
      initLinkerHandlers()
    } else {
      window.addEventListener('cookie-consent', window.DI.analyticsUa.init)
    }
  }

  analytics.init = init

})(window.DI.analyticsUa)