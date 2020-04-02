const { serializeError } = require('serialize-error')

const ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    const speakOutput = handlerInput.t('ERROR_MSG')
    console.log(`~~~~ Error handled: ${JSON.stringify(serializeError(error))}`)

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  }
}

module.exports = ErrorHandler
