import { LoginPage } from '../../pages/LoginPage';

const loginPage = new LoginPage();

const testUser = {
  name: 'Karisto Test',
  email: `qatest_${Date.now()}@mailinator.com`,
  password: 'Test@1234',
};

describe('Authentication', () => {
  before(() => {
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: {
        name: testUser.name,
        email: testUser.email,
        password: testUser.password,
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '1990',
        firstname: 'Karisto',
        lastname: 'Test',
        company: 'Test Co',
        address1: '123 Test Street',
        address2: '',
        country: 'United States',
        zipcode: '12345',
        state: 'NY',
        city: 'New York',
        mobile_number: '0000000000',
      },
    }).its('status').should('eq', 200);
  });

  after(() => {
    cy.request({
      method: 'DELETE',
      url: '/api/deleteAccount',
      form: true,
      body: { email: testUser.email, password: testUser.password },
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it('logs in successfully with valid credentials', () => {
    loginPage.login(testUser.email, testUser.password);
    cy.get('a[href="/logout"]').should('be.visible');
    cy.get('li a b').should('contain', testUser.name);
  });

  it('shows error message with invalid credentials', () => {
    loginPage.login('wrong@email.com', 'wrongpassword');
    loginPage.getLoginErrorMessage().should('contain', 'Your email or password is incorrect!');
  });

  it('logs out successfully after login', () => {
    loginPage.login(testUser.email, testUser.password);
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
