const Alexa = require('ask-sdk-core')

const IntentReflectorHandler = {
  canHandle (handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
  },
  handle (handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope)
    const speakOutput = handlerInput.t('REFLECTOR_MSG', { intentName: intentName })

    return handlerInput.responseBuilder
      .speak(speakOutput)
      // .reprompt('add a reprompt if you want to keep the session open for the user to respond')
      .getResponse()
  }
}

module.exports = IntentReflectorHandler
