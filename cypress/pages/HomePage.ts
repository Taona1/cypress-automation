export class HomePage {
  visit() {
    cy.visit('/');
  }

  getNavbar() {
    return cy.get('.navbar-nav');
  }

  clickLogin() {
    cy.get('a[href="/login"]').click();
  }

  clickProducts() {
    cy.get('a[href="/products"]').click();
  }

  clickCart() {
    cy.get('a[href="/view_cart"]').first().click();
  }

  isLoaded() {
    cy.url().should('include', 'automationexercise.com');
    cy.get('.logo.pull-left').should('be.visible');
  }

  getSliderSection() {
    return cy.get('#slider');
  }

  getFeaturedItems() {
    return cy.get('.features_items .col-sm-4');
  }
}
