const Alexa = require('ask-sdk-core')

const LaunchRequestHandler = require('./handlers/launch')
const ReadCategoryIntentHandler = require('./handlers/readCategory')
const ErrorHandler = require('./handlers/error')
const HelpIntentHandler = require('./handlers/help')
const CancelAndStopIntentHandler = require('./handlers/cancel')
const SessionEndedRequestHandler = require('./handlers/end')
const IntentReflectorHandler = require('./handlers/interceptor')
const ReadArticleIntentHandler = require('./handlers/readArticle')

const LocalisationRequestInterceptor = require('./interceptors/localisation')
const StateInterceptor = require('./interceptors/state')

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ReadCategoryIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    ReadArticleIntentHandler,
    IntentReflectorHandler)
  .addErrorHandlers(
    ErrorHandler)
  .addRequestInterceptors(
    LocalisationRequestInterceptor,
    StateInterceptor.Request
  )
  .addResponseInterceptors(
    StateInterceptor.Response
  )
  .lambda()
