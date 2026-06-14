Cypress.Commands.add('dismissAds', () => {
  cy.get('body').then(($body) => {
    if ($body.find('iframe[id^="aswift"]').length > 0) {
      cy.get('iframe[id^="aswift"]').each(($iframe) => {
        $iframe.remove();
      });
    }
  });
});

Cypress.Commands.add('loginViaUI', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
  cy.get('a[href="/logout"]').should('be.visible');
});

declare global {
  namespace Cypress {
    interface Chainable {
      dismissAds(): Chainable<void>;
      loginViaUI(email: string, password: string): Chainable<void>;
    }
  }
}
