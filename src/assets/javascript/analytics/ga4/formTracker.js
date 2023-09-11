/* global window */

window.DI = window.DI || {}
window.DI.analyticsGa4 = window.DI.analyticsGa4 || {}
window.DI.analyticsGa4.trackers = window.DI.analyticsGa4.trackers || {};

(function (trackers) {

  'use strict'

  function FormTracker (element) {
    this.element = element
    this.trackingTrigger = 'ga4-data-form' // elements with this attribute get tracked
  }

  FormTracker.prototype.init = function () {
    this.element.addEventListener('submit', this.trackFormSubmit.bind(this))
  }

  FormTracker.prototype.trackFormSubmit = function (event) {
    const target = window.DI.core.trackerFunctions.findTrackingAttributes(event.target, this.trackingTrigger)
    if (!target) {
      /* eslint-disable-next-line no-console */
      console.warn("Could not find the form tracker configuration")
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

    // Do not send the form_response event if some configuration is missing
    if (typeof data.type !== 'string' || typeof data.section !== 'string' || typeof data.action !== 'string') {
      /* eslint-disable-next-line no-console */
      console.warn("Missing ga4-data-form configuration properties. Expected: [type: string, section: string, action: string]")
      return
    }

    const formInputs = this.getFormInputs()
    const inputValues = this.getInputValues(formInputs)

    // Do not send form_response event if user has not input anything
    if (inputValues.length === 0) return

    const responses = this.convertInputsToString(inputValues)
    const formResponseEvent = {
      event: 'event_data',
      event_data: {
        event_name: 'form_response',
        type: data.type.toLowerCase(),
        url: undefined,
        text: responses,
        section: data.section.toLowerCase(),
        action: data.action.toLowerCase(),
        external: undefined
      }
    }
    window.DI.core.sendData(formResponseEvent)
  }

  FormTracker.prototype.getFormInputs = function () {
    const labels = this.element.querySelectorAll('label')
    const inputs = []

    for (const label of labels) {
      const element = this.getInputForLabel(label)
      if (element !== null) inputs.push({ label, element })
    }
    return inputs
  }

  FormTracker.prototype.getInputForLabel = function (label) {
    const labelFor = label.getAttribute('for')
    if (labelFor) {
      return this.element.querySelector('[id=' + labelFor + ']')
    } else {
      return label.querySelector('input')
    }
  }

  FormTracker.prototype.getInputValues = function (inputs) {
    return inputs.map(input => {
      const inputValueMapper = this.getInputValueMapper(input.element)
      return {
        ...input,
        answer: inputValueMapper ? inputValueMapper(input) : null
      }
    }).filter(input => input.answer !== null)
  }

  // If a new input type needs to be parsed, this function should be updated to identify what type of
  //  input it is and return the corresponding mapper for parsing the input should be returned
  FormTracker.prototype.getInputValueMapper = function (element) {
    const inputType = element.getAttribute('type')
    if (inputType === 'radio') {
      return this.getRadioButtonInput
    } else {
      return null
    }
  }

  // Mappers for parsing inputs
  FormTracker.prototype.getRadioButtonInput = function (input) {
    const labelText = input.label.innerText || input.label.textContent
    return input.element.checked ?  labelText : null
  }

  FormTracker.prototype.convertInputsToString = function (inputs) {
    return inputs.map(input => input.answer.toLowerCase()).join(',')
  }

  trackers.FormTracker = FormTracker

})(window.DI.analyticsGa4.trackers)
