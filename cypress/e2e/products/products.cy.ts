import { ProductsPage } from '../../pages/ProductsPage';
import { HomePage } from '../../pages/HomePage';

const productsPage = new ProductsPage();
const homePage = new HomePage();

describe('Products', () => {
  it('displays all products on the products page', () => {
    productsPage.visit();
    productsPage.getAllProducts().should('have.length.greaterThan', 0);
  });

  it('navigates to products page from homepage', () => {
    homePage.visit();
    homePage.clickProducts();
    cy.url().should('include', '/products');
    productsPage.getAllProducts().should('be.visible');
  });

  it('searches for a product and returns matching results', () => {
    productsPage.visit();
    productsPage.searchProduct('top');
    cy.url().should('include', 'search');
    productsPage.getSearchResults().should('have.length.greaterThan', 0);
    productsPage.getSearchResults().each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include('top');
      });
    });
  });

  it('intercepts products API and verifies response', () => {
    cy.intercept('GET', '**/api/productsList').as('getProducts');
    productsPage.visit();
    cy.wait('@getProducts').its('response.statusCode').should('eq', 200);
  });

  it('navigates to product detail page', () => {
    productsPage.visit();
    productsPage.clickViewFirstProduct();
    cy.url().should('include', '/product_details/');
    cy.get('.product-information h2').should('be.visible');
    cy.get('.product-information span span').should('be.visible');
  });
});
