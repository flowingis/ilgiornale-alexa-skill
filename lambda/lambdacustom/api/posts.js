const axios = require('axios')
const _ = require('lodash')
const textVersion = require('./parseHtml')
const { baseUrl } = require('./config.json')

const SIZE = 4

const MAX_SIZE = 6000

const SENTENCES_SPLITTER = /[^\\.!\\?]+[\\.!\\?]+/g

const cleanupText = s => {
  return s
    .replace(/&#39;/g, "'")
    .replace(/"/g, '')
    .replace(/&quot;/g, '"')
    .replace(/\r?\n|\r/g, '')
    .replace(/\t/g, '')
    .replace(/ '/gm, "'")
}

const parseContentInfo = content => {
  const baseText = textVersion(content)
  const cleanedText = cleanupText(baseText)

  if (cleanedText.length <= MAX_SIZE) {
    return {
      content: cleanedText,
      truncated: false
    }
  }

  const results = cleanedText.match(SENTENCES_SPLITTER)

  while (results.join('').length > MAX_SIZE) {
    results.pop()
  }

  return {
    content: results.join(''),
    truncated: true
  }
}

const list = async id => {
  const url = `${baseUrl}?id=${id}`
  const response = await axios.get(url)
  const items = response
    .data
    .items
    .map(i => _.pick(i, 'id', 'title', 'picture_url', 'authors', 'content'))
    .map(i => {
      const contentInfo = parseContentInfo(i.content)
      return Object.assign({}, i, contentInfo, {
        title: cleanupText(i.title)
      })
    })

  return _.take(items, SIZE)
}

const content = async (categoryId, index) => {
  const items = await list(categoryId)
  return items[index]
}

module.exports = {
  list,
  content
}
