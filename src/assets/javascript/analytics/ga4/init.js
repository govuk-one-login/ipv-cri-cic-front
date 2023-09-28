/* global window */

window.DI = window.DI || {}
window.DI.analyticsGa4 = window.DI.analyticsGa4 || {};

(function (analytics) {

  'use strict'

  const init = function() {

    const consentGiven = window.DI.cookies.hasConsentForAnalytics()

    if (consentGiven) {
      window.DI.core.load(window.DI.analytics.vars.ga4ContainerId)

      initGa4GlobalTrackers()
    } else {
      window.addEventListener('cookie-consent', () => window.DI.analyticsGa4.init())
    }
  }

  // Initialise trackers for GA4 events which can be tracked at the global page level, such as page_view events
  const initGa4GlobalTrackers = function () {
    const trackers = window.DI.analyticsGa4.trackers
    for (const trackerName in trackers) {
      if (Object.hasOwn(trackers, trackerName)) {
        const tracker = trackers[trackerName]
        if (typeof tracker.init === 'function') {
          try {
            tracker.init()
          } catch (e) {
            // if there's a problem with the tracker, catch the error to allow other trackers to start
            /* eslint-disable-next-line no-console */
            console.warn('Error starting analytics tracker ' + tracker + ': ' + e.message, window.location)
          }
        }
      }
    }
  }

  analytics.init = init

})(window.DI.analyticsGa4)