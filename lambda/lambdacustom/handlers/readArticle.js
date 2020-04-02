const Alexa = require('ask-sdk-core')
const posts = require('../api/posts')
const _ = require('lodash')

const ReadArticleIntentHandler = {
  canHandle (handlerInput) {
    if (Alexa.getRequestType(handlerInput.requestEnvelope) !== 'IntentRequest') {
      return false
    }

    if (Alexa.getIntentName(handlerInput.requestEnvelope) !== 'ReadArticleIntent') {
      return false
    }

    return Boolean(handlerInput.state.currentCategory)
  },
  async handle (handlerInput) {
    const operationSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'ArticleIndex')
    const id = _.get(operationSlot, 'resolutions.resolutionsPerAuthority[0].values[0].value.id')

    if (!id) {
      const speakOutput = handlerInput.t('NO_ARTICLE_MSG')
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse()
    }

    const post = await posts.content(handlerInput.state.currentCategory, parseInt(id) - 1)

    if (!post) {
      const speakOutput = handlerInput.t('NO_ARTICLE_MSG')
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse()
    }

    const messageKey = post.truncated ? 'TRUNCATED_ARTICLE_MSG' : 'ARTICLE_MSG'

    const speakOutput = handlerInput.t(messageKey, post)

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withShouldEndSession(true)
      .withStandardCard(
        'il Giornale',
        post.title,
        post.picture_url,
        post.picture_url)
      .getResponse()
  }
}

module.exports = ReadArticleIntentHandler
