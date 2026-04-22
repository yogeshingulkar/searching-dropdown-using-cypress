// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('selectStaticDropdown', (selector, value) => {
  cy.get(selector).select(value)
})

Cypress.Commands.add('selectDynamicDropdown', (input, list, value) => {
  cy.get(input).clear().type(value)

  cy.get(list).each(($el) => {
    if ($el.text().includes(value)) {
      cy.wrap($el).click()
    }
  })
})

Cypress.Commands.add('selectByIndex', (selector, index) => {
  cy.get(selector).eq(index).click()
})

Cypress.Commands.add('validateDropdownValue', (selector, expected) => {
  cy.get(selector).should('contain.text', expected)
})

Cypress.Commands.add('multiSelectDropdown', (input, list, values) => {
  values.forEach(val => {
    cy.get(input).type(val)
    cy.get(list).contains(val).click()
  })
})