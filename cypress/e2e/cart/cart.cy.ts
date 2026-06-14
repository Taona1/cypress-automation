import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { HomePage } from '../../pages/HomePage';

const productsPage = new ProductsPage();
const cartPage = new CartPage();
const homePage = new HomePage();

describe('Cart', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('adds a product to the cart from the products page', () => {
    productsPage.visit();
    productsPage.addFirstProductToCart();
    cy.get('#cartModal').should('be.visible');
    productsPage.viewCartAfterAdd();
    cy.url().should('include', '/view_cart');
    cartPage.getCartItems().should('have.length.greaterThan', 0);
  });

  it('cart shows one item after adding a product', () => {
    productsPage.visit();
    productsPage.addFirstProductToCart();
    productsPage.viewCartAfterAdd();
    cartPage.getCartItems().should('have.length', 1);
  });

  it('removes an item from the cart', () => {
    productsPage.visit();
    productsPage.addFirstProductToCart();
    productsPage.viewCartAfterAdd();
    cartPage.getCartItems().should('have.length', 1);
    cartPage.removeFirstItem();
    cartPage.getCartItems().should('have.length', 0);
  });

  it('navigates to cart from homepage nav', () => {
    homePage.visit();
    homePage.clickCart();
    cy.url().should('include', '/view_cart');
  });
});
