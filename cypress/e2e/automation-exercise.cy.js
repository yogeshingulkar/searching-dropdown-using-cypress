/// <reference types="cypress" />

describe('Automation Exercise - Search & Dropdown', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  })

  it('Search product and validate results', () => {

    cy.get('a[href="/products"]').click()

    cy.get('#search_product').type('Tshirt')
    cy.get('#submit_search').click()

    cy.get('.productinfo').should('exist')

  })

  it('Validate search results contain keyword', () => {

    cy.get('a[href="/products"]').click()

    cy.get('#search_product').type('Dress')
    cy.get('#submit_search').click()

    cy.get('.productinfo').each(($el) => {
      expect($el.text().toLowerCase()).to.include('dress')
    })

  })

  it('Search with no results', () => {

    cy.get('a[href="/products"]').click()

    cy.get('#search_product').type('xyz123')
    cy.get('#submit_search').click()

    cy.get('body').should('contain.text', 'No products')

  })

  it('Filter products by category (Dropdown-like)', () => {

    cy.get('a[href="/products"]').click()

    cy.get('.panel-heading').first().click()

    cy.get('.panel-body ul li a').first().click()

    cy.get('.productinfo').should('exist')

  })

  it('Select sub-category and validate products', () => {

    cy.get('a[href="/products"]').click()

    cy.get('.panel-heading').eq(1).click()

    cy.get('.panel-body ul li a').eq(0).click()

    cy.get('.productinfo').should('have.length.greaterThan', 0)

  })

  it('Search + Add to cart flow', () => {

    cy.get('a[href="/products"]').click()

    cy.get('#search_product').type('Top')
    cy.get('#submit_search').click()

    cy.get('.product-overlay').first().invoke('show')
    cy.contains('Add to cart').first().click({ force: true })

    cy.get('#cartModal').should('be.visible')

  })

  it('Validate dropdown navigation flow', () => {

    cy.get('a[href="/products"]').click()

    cy.get('.panel-heading').each(($el, index) => {
      if (index < 2) {
        cy.wrap($el).click()
      }
    })

  })

})