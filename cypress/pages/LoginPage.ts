export class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillLoginEmail(email: string) {
    cy.get('[data-qa="login-email"]').clear().type(email);
  }

  fillLoginPassword(password: string) {
    cy.get('[data-qa="login-password"]').clear().type(password);
  }

  submitLogin() {
    cy.get('[data-qa="login-button"]').click();
  }

  login(email: string, password: string) {
    this.fillLoginEmail(email);
    this.fillLoginPassword(password);
    this.submitLogin();
  }

  getLoginErrorMessage() {
    return cy.get('p[style="color: red;"]').first();
  }

  fillSignupName(name: string) {
    cy.get('[data-qa="signup-name"]').clear().type(name);
  }

  fillSignupEmail(email: string) {
    cy.get('[data-qa="signup-email"]').clear().type(email);
  }

  submitSignup() {
    cy.get('[data-qa="signup-button"]').click();
  }
}
