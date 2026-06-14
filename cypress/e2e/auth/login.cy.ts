import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';

const loginPage = new LoginPage();
const homePage = new HomePage();

describe('Authentication', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('logs in successfully with valid credentials', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.validUser.email, users.validUser.password);
      cy.get('a[href="/logout"]').should('be.visible');
      cy.get('li a').contains('Logged in as').should('be.visible');
    });
  });

  it('shows error message with invalid credentials', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.invalidUser.email, users.invalidUser.password);
      loginPage.getLoginErrorMessage().should('contain', 'Your email or password is incorrect!');
    });
  });

  it('logs out successfully after login', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.validUser.email, users.validUser.password);
      cy.get('a[href="/logout"]').click();
      cy.url().should('include', '/login');
    });
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
