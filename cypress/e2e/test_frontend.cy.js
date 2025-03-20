Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

/// <reference types="cypress" />

describe('Formulário de Registro', () => {
    beforeEach(() => {
        // Bloqueia requisições externas (Google Ads, etc.)
        Cypress.on('window:before:load', (win) => {
            win.fetch = null;
        });

        // Intercepta requisições para adsbygoogle.js
        cy.intercept('GET', '**/adsbygoogle.js', {
            statusCode: 403,
            body: 'Blocked by Cypress'
        }).as('adsBlock');
    });

    it('Deve preencher e submeter o formulário com sucesso', () => {
        cy.visit('https://demoqa.com/automation-practice-form')

        // Preencher campos do formulário
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Silva')
        cy.get('#userEmail').type('joao.silva@gmail.com')
        cy.get('#gender-radio-1').check({ force: true })
        cy.get('#userNumber').type('1234567890')

        // Data de nascimento
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__year-select').select('2000')
        cy.get('.react-datepicker__month-select').select('January')
        cy.get('.react-datepicker__day--001:not(.react-datepicker__day--outside-month)').click()

        // Selecionar matéria
        cy.get('.subjects-auto-complete__value-container').type('Maths{enter}')

        // Selecionar hobbies
        cy.get('#hobbies-checkbox-1').check({ force: true })

        // Upload de arquivo
        cy.get('#uploadPicture').selectFile('cypress/fixtures/example.json')

        // Endereço
        cy.get('#currentAddress').type('Rua Exemplo, 123')

        // Selecionar estado e cidade
        cy.get('#state').click({ force: true })
        cy.get('.css-1uccc91-singleValue').should('be.visible') // Aguarda o dropdown abrir
        cy.contains('div', 'NCR').click({ force: true }) // Seleciona "NCR" no dropdown
        cy.get('#city').click({ force: true })
        cy.contains('div', 'Delhi').click({ force: true }) // Seleciona "Delhi" no dropdown

        // Submeter formulário
        cy.get('#submit').click()

        // Validar modal
        cy.get('.modal-content').should('be.visible')
        cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form')
        cy.get('#closeLargeModal').click()
    })
})

describe('Web Tables', () => {
    it('Deve criar, editar e deletar registros', () => {
        cy.visit('https://demoqa.com/webtables')

        // Criar registro
        cy.get('#addNewRecordButton').click()
        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Oliveira')
        cy.get('#userEmail').type('maria@gmail.com')
        cy.get('#age').type('30')
        cy.get('#salary').type('5000')
        cy.get('#department').type('Tech')
        cy.get('#submit').click()

        // Aguardar o registro ser criado
        cy.contains('Maria').should('be.visible')

        // Editar registro
        cy.contains('Edit').first().click({ force: true })
        cy.get('#firstName').clear().type('Ana')
        cy.get('#submit').click()

        // Deletar registro
        cy.contains('Delete').first().click({ force: true })
    })
})

describe('Progress Bar', () => {
    it('Deve validar o comportamento da barra de progresso', () => {
        cy.visit('https://demoqa.com/progress-bar')

        cy.get('#startStopButton').click()
        cy.wait(3000) // Aguarda a barra atingir 25%

        cy.get('#progressBar').invoke('attr', 'aria-valuenow').then((value) => {
            if (parseInt(value) >= 25) {
                cy.get('#startStopButton').click() // Interrompe a barra de progresso
            }
        })

        cy.get('#resetButton').should('be.visible').click() // Clica no botão de reset
    })
})

describe('Sortable', () => {
    it('Deve reordenar os valores usando drag and drop', () => {
        cy.visit('https://demoqa.com/sortable')

        // Simular drag and drop
        cy.get('.list-group-item').first().trigger('mousedown', { which: 1, force: true })
        cy.get('.list-group-item').eq(1).trigger('mousemove', { clientX: 0, clientY: 50, force: true })
        cy.get('.list-group-item').eq(1).trigger('mouseup', { force: true })

        // Verificar se o primeiro item agora é "Two"
        cy.get('.list-group-item').first().should('contain', 'Two')
    })
})

describe('Browser Windows', () => {
    it('Deve abrir uma nova janela e validar o conteúdo', () => {
        cy.visit('https://demoqa.com/browser-windows')

        // Abrir nova janela
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen') // Simula a abertura da nova janela
        })

        cy.get('#windowButton').click()

        // Validar que a nova janela foi aberta
        cy.get('@windowOpen').should('be.calledWith', 'https://demoqa.com/sample')
    })
})