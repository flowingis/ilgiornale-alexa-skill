const Alexa = require('ask-sdk-core')
const posts = require('../api/posts')
const _ = require('lodash')

const ORDINALS = ['primo', 'secondo', 'terzo', 'quarto']

const ReadCategoryIntentHandler = {
  canHandle (handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
              Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReadCategoryIntent'
  },
  async handle (handlerInput) {
    const operationSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'Category')
    const id = _.get(operationSlot, 'resolutions.resolutionsPerAuthority[0].values[0].value.id')
    const name = _.get(operationSlot, 'resolutions.resolutionsPerAuthority[0].values[0].value.name')

    if (!id) {
      const speakOutput = handlerInput.t('NO_CATEGORY_MSG')
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse()
    }

    const results = await posts.list(id)
    const titles = results.map((post, index) => {
      return handlerInput.t('POST_MSG', { ordinal: ORDINALS[index], title: post.title })
    }).join(' ')

    const speakOutput = handlerInput.t('LIST_MSG', { category: name, number: results.length, titles })

    handlerInput.state.currentCategory = id

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(handlerInput.t('LIST_REPROMPT'))
      .getResponse()
  }
}

module.exports = ReadCategoryIntentHandler
