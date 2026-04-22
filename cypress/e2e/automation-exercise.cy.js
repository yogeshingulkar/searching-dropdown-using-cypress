/// <reference types="cypress" />

describe('Automation Exercise - Search options & Dropdown options', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  })

  it('Search product and validate results', () => {

    cy.get('a[href="/products"]').click()
    cy.get('#search_product').clear().type('Tshirt').should('have.value', 'Tshirt')
    cy.get('#submit_search').click()
    cy.url().should('include', 'search')
    cy.get('.productinfo').should('exist').and('be.visible').as('products')
    cy.get('@products').its('length').should('be.greaterThan', 0)
    cy.log('test pass because search results are displayed for valid search term');
  })


  it('Validate search results contain keyword (robust)', () => {

    cy.get('a[href="/products"]').click()
    cy.get('#search_product').type('Dress')
    cy.get('#submit_search').click()

    cy.get('.productinfo').then(($products) => {
      const matches = []
      $products.each((index, el) => {
        const text = el.innerText.toLowerCase()
        if (text.includes('dress')) {
          matches.push(text)
        }
      })
      expect(matches.length).to.be.greaterThan(0)
    })
  })


  it('Search with no results (correct validation)', () => {

    cy.get('a[href="/products"]').click()
    cy.get('#search_product').type('xyz123')
    cy.get('#submit_search').click()
    cy.get('.productinfo').should('have.length', 0)
    cy.log('test pass because no products are displayed for non-existent search term');
  })


  it('Filter products by category (proper visibility handling)', () => {

    cy.get('a[href="/products"]').click()
    cy.get('.panel-heading').first().should('be.visible').click()

    cy.get('#Women')
      .should('be.visible')
      .within(() => {
        cy.get('ul li a').first().should('be.visible').click()
      })

    cy.get('.productinfo').should('exist').and('have.length.greaterThan', 0)
    cy.log('test failed because category filter is not working as expected');
  })

  it('Select sub-category and validate products', () => {

    cy.get('a[href="/products"]').click()
    cy.get('.panel-heading').first().click()
    cy.get('#Women')
      .should('be.visible')
      .within(() => {
        cy.get('ul li a').eq(0).click()
      })

    cy.get('.productinfo').should('be.visible').and('have.length.greaterThan', 0)
    cy.log('test failed because category filter is not working as expected');
  })

  it('Search + Add to cart flow (advanced)', () => {

    cy.get('a[href="/products"]').click()
    cy.get('#search_product').type('Top')
    cy.get('#submit_search').click()

    cy.get('.productinfo').first().within(() => {
        cy.get('.product-overlay').invoke('show')
        cy.get('a').contains('Add to cart').click({ force: true })
      })
    cy.get('#cartModal').should('be.visible').and('contain.text', 'Added')
    cy.log('test failed because add to cart flow is not working as expected');
  })

  it('Validate dropdown navigation flow using each()', () => {

    cy.get('a[href="/products"]').click()
    cy.get('.panel-heading').should('have.length.greaterThan', 1)
      .each(($el, index) => {

        if (index < 2) {
          cy.wrap($el).scrollIntoView().should('be.visible').click()
        }
      })
      cy.log('test pass because dropdown options are visible and clickable');
  })
})