/* global window */

window.DI = window.DI || {}
window.DI.analyticsGa4 = window.DI.analyticsGa4 || {}
window.DI.analyticsGa4.trackers = window.DI.analyticsGa4.trackers || {};

(function (trackers) {

  'use strict'

  function NavigationTracker (element) {
    this.element = element
    this.trackingTrigger = 'ga4-data-navigation' // elements with this attribute get tracked
  }

  NavigationTracker.prototype.init = function () {
    this.element.addEventListener('click', this.trackButtonClick.bind(this))
  }

  NavigationTracker.prototype.trackButtonClick = function (event) {
    const target = window.DI.core.trackerFunctions.findTrackingAttributes(event.target, this.trackingTrigger)
    if (!target) {
      /* eslint-disable-next-line no-console */
      console.warn("Could not find the navigation tracker configuration")
      return
    }

    let data
    try {
      data = JSON.parse(target.getAttribute(this.trackingTrigger))
    } catch (e) {
      // If there's a problem with the config, don't start the tracker
      /* eslint-disable-next-line no-console */
      console.warn(`GA4 configuration error: ${e.message}`)
      return
    }

    if (typeof data.text !== 'string' || typeof data.type !== 'string' || typeof data.external !== 'string') {
      /* eslint-disable-next-line no-console */
      console.warn("Missing ga4-data-navigation configuration properties. Expected: [text: string, type: string, external: string]")
      return
    }

    const navigationResponseEvent = {
      event: 'event_data',
      event_data: {
        event_name: 'navigation',
        type: data.type.toLowerCase(),
        url: undefined,
        text: data.text.toLowerCase(),
        section: undefined,
        action: undefined,
        external: data.external.toLowerCase()
      }
    }
    window.DI.core.sendData(navigationResponseEvent)
  }

  trackers.NavigationTracker = NavigationTracker

})(window.DI.analyticsGa4.trackers)
