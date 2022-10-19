/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { ProductPage } = require("../pages/productPage");
const { ShopifyIntegrationPage } = require("../pages/shopifyIntegrationPage");
import user from "../fixtures/userData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();
const productPage = new ProductPage();
const shopifyIntegrationPage = new ShopifyIntegrationPage();

describe('OrderPage Functionality', () => {
    before(() => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
            .verifyInHomePage();
    })

    it('C_001 Show Products - empty When seller click PRODUCTS', () => {
        homePage.clickProductsOnMenu();
        productPage
            .verifyEmptyProductMessages()
            .verifyShowProductPage();
    })

    it('C_003 Show “Integrate with Shopify” popup When seller click “Integrate with Shopify” button in product list page', () => {
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage.verifyShowIntegrateWithShopifyPoup();
    })

})