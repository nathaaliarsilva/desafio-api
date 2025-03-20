describe('Teste de API', () => {
    it('Validar resposta da API', () => {
      cy.request('/posts/1')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', 1);
          expect(response.body).to.have.property('title');
          expect(response.body).to.have.property('body');
        });
    });
  
    it('Criar novo post', () => {
      cy.request('POST', '/posts', {
        title: 'Novo Post',
        body: 'Conteúdo do novo post',
        userId: 1
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('title', 'Novo Post');
        expect(response.body).to.have.property('body', 'Conteúdo do novo post');
      });
    });
  });
  describe('Teste de Frontend', () => {
    it('Visitar página e validar título', () => {
      cy.visit('https://example.cypress.io'); // URL de teste do Cypress
      cy.contains('Kitchen Sink').should('be.visible');
    });
  
    it('Preencher campo e clicar em botão', () => {
      cy.visit('https://example.cypress.io/commands/actions');
      cy.get('#email1')
        .type('test@example.com')
        .should('have.value', 'test@example.com');
      cy.get('.action-btn').click();
    });
  });
  