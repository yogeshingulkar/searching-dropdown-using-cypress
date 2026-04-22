/// <reference types="cypress" />

describe('Reusable Dropdown Framework', () => {

  beforeEach(() => {
    cy.visit('https://demoqa.com/select-menu')
  })

  it('Static dropdown selection', () => {
    cy.selectStaticDropdown('#oldSelectMenu', 'Purple')
    cy.validateDropdownValue('#oldSelectMenu', 'Purple')
  })

  it('Dynamic dropdown selection', () => {
    cy.selectDynamicDropdown('#react-select-2-input', '.css-26l3qy-menu div', 'Blue')
  })

  it('Multi-select dropdown', () => {
    cy.multiSelectDropdown('#react-select-4-input', '.css-26l3qy-menu div', ['Red', 'Green'])
  })

})