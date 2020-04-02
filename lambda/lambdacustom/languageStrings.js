module.exports = {
  it: {
    translation: {
      WELCOME_MSG: 'Benvenuto nella skill de il giornale! Puoi chiedermi le ultime notizie di Cronaca, Politica o Economia. Cosa preferisci fare?',
      HELLO_MSG: 'Ciao!',
      NO_CATEGORY_MSG: 'La categoria selezionata non esiste, puoi scegliere tra Cronaca, Politica o Economia.',
      NO_ARTICLE_MSG: 'L\'articolo che hai selezionato non è valido. Riprova',
      HELP_MSG: 'Puoi chiedermi le ultime notizie di Cronaca, Politica o Economia.',
      GOODBYE_MSG: 'A presto!',
      LIST_MSG: 'Ecco gli ultimi {{number}} articoli di {{category}}. {{titles}} $t(LIST_REPROMPT)',
      LIST_REPROMPT: 'Che articolo vuoi che ti legga?',
      POST_MSG: '{{ordinal}} articolo. {{title}}.',
      TRUNCATED_ARTICLE_MSG: '<p>Ecco un\'estratto dell\'articolo richiesto. Per leggere l\'articolo completo vai su ilgiornale.it</p><break time="500ms"/>{{title}}<break time="500ms"/>{{content}}',
      ARTICLE_MSG: '{{title}}<break time="500ms"/>{{content}}',
      REFLECTOR_MSG: 'Hai invocato l\'intento {{intentName}}',
      FALLBACK_MSG: 'Perdonami, penso di non aver capito bene. Riprova.',
      ERROR_MSG: 'Scusa, c\'è stato un errore. Riprova.'
    }
  }
}
