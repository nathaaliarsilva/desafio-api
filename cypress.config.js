const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com', // API de teste
    setupNodeEvents(on, config) {
      // implementar eventos se necessário
    }
  }
})
