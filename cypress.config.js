const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }
})
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com', // URL base para os testes de API
    setupNodeEvents(on, config) {
      // Nenhuma configuração adicional por enquanto
      return config;
    }
  }
});
