const Alexa = require('ask-sdk-core')
const i18n = require('i18next')
const languageStrings = require('../languageStrings')

const LocalisationRequestInterceptor = {
  async process (handlerInput) {
    const t = await i18n.init({
      lng: Alexa.getLocale(handlerInput.requestEnvelope),
      resources: languageStrings
    })

    handlerInput.t = (key, options) => {
      const value = t(
        key,
        { ...options, returnObjects: true }
      )

      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)]
      } else {
        return value
      }
    }
  }
}

module.exports = LocalisationRequestInterceptor
