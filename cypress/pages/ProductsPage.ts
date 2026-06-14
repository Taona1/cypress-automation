export class ProductsPage {
  visit() {
    cy.visit('/products');
  }

  getAllProducts() {
    return cy.get('.product-image-wrapper');
  }

  searchProduct(term: string) {
    cy.get('#search_product').clear().type(term);
    cy.get('#submit_search').click();
  }

  getSearchResults() {
    return cy.get('.productinfo');
  }

  getFirstProductName() {
    return cy.get('.productinfo p').first();
  }

  clickViewFirstProduct() {
    cy.get('a[href*="/product_details/"]').first().click();
  }

  addFirstProductToCart() {
    cy.get('.product-image-wrapper').first().trigger('mouseover');
    cy.get('.product-image-wrapper').first().find('.add-to-cart').first().click();
  }

  continueShoppingAfterAdd() {
    cy.get('.modal-footer button').contains('Continue Shopping').click();
  }

  viewCartAfterAdd() {
    cy.get('u').contains('View Cart').click();
  }
}
