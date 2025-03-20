const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com', // URL de teste para validar
    setupNodeEvents(on, config) {
      // implementar eventos se necessário
    }
  }
})
