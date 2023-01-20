/* global window document */
window.GOVUKFrontend.initAll()
window.onload = function () {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      // eslint-disable-next-line no-undef
      navigator.userAgent
    )
  ) {
    setVoiceOverFocus()
  }
}

function setVoiceOverFocus() {
  const focusInterval = 10 // ms, time between function calls
  const focusTotalRepetitions = 10 // number of repetitions
  const mainContent = document.getElementsByTagName("main")["main-content"]
  const cookieBanner = document.getElementsByClassName('govuk-cookie-banner')[0]
  const mainElement = cookieBanner.style.display === 'block' ? cookieBanner : mainContent

  mainElement.setAttribute("tabindex", "0")
  mainElement.blur()

  let focusRepetitions = 0
  const interval = window.setInterval(function () {
    mainElement.focus()

    focusRepetitions++
    if (focusRepetitions >= focusTotalRepetitions) {
      window.clearInterval(interval)
    }
  }, focusInterval)
}

(function (w) {
  "use strict";
  function appInit(trackingId, analyticsCookieDomain) {
    const cookies = window.GOVUKFrontend.Cookies(trackingId, analyticsCookieDomain);

    if (cookies.hasConsentForAnalytics()) {
      cookies.initAnalytics();
    }

    cookies.cookieBannerInit();
  }
  w.GOVUKFrontend.appInit = appInit;
})(window);