import { LoginPage } from '../../pages/LoginPage';

const loginPage = new LoginPage();

const TEST_EMAIL = Cypress.env('TEST_EMAIL') || 'taona8495@gmail.com';
const TEST_PASSWORD = Cypress.env('TEST_PASSWORD') || 'password';
const TEST_NAME = 'QAtest';

describe('Authentication', () => {
  beforeEach(() => {
    cy.clearCookies();
    loginPage.visit();
  });

  it('logs in successfully with valid credentials', () => {
    loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    cy.get('a[href="/logout"]').should('be.visible');
    cy.get('li a b').should('contain', TEST_NAME);
  });

  it('shows error message with invalid credentials', () => {
    loginPage.login('wrong@email.com', 'wrongpassword');
    loginPage.getLoginErrorMessage().should('contain', 'Your email or password is incorrect!');
  });

  it('logs out successfully after login', () => {
    loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    cy.get('a[href="/logout"]').click();
    cy.url().should('include', '/login');
  });

  it('login page has both login and signup forms', () => {
    cy.get('[data-qa="login-email"]').should('be.visible');
    cy.get('[data-qa="login-password"]').should('be.visible');
    cy.get('[data-qa="login-button"]').should('be.visible');
    cy.get('[data-qa="signup-name"]').should('be.visible');
    cy.get('[data-qa="signup-email"]').should('be.visible');
    cy.get('[data-qa="signup-button"]').should('be.visible');
  });
});
