export class CartPage {
  visit() {
    cy.visit('/view_cart');
  }

  getCartItems() {
    return cy.get('#cart_info_table tbody tr');
  }

  getCartItemCount() {
    return cy.get('#cart_info_table tbody tr').its('length');
  }

  clickProceedToCheckout() {
    cy.get('a[href="/checkout"]').click();
  }

  isEmpty() {
    return cy.get('#empty_cart').should('be.visible');
  }

  removeFirstItem() {
    cy.get('.cart_quantity_delete').first().click();
  }
}
