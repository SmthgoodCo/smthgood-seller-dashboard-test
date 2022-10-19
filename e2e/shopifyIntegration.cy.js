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
    
    it('C_004 Open new tab and show “Shopify Integration” page When seller click “here” tab in “Integrate with Shopify” page', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
            .verifyInHomePage();
        homePage.clickProductsOnMenu();
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .clickHereLink()
            .verifyShowShopifyIntegrationPage();
    })

    it('C_005 Show image When seller click left arrow icon', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
        homePage.clickProductsOnMenu();
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .clickArrowIconButon('left')
            .verifyShowSlideImage();
    })

    it('C_006 Show image When seller click right arrow icon', () => {
        shopifyIntegrationPage
            .clickArrowIconButon('right')
            .verifyShowSlideImage();
    })

    // Check test case C_007 don't have "Back" icon
    it('C_007 Show list product page When seller click back button', () => {
        shopifyIntegrationPage
            .clickCancelButton();
        productPage
            .verifyShowProductPage();
    })

    it('C_008 Show message When seller leave “YOUR SHOPIFY API KEY” field blank', () => {
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputAdminApiAccessToken(user.valid.adminApiAccessToken)
            .inputShopUrl(user.valid.shopUrl)
            .inputWebhook(user.valid.webhookVersion)
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 1);
    })

    it('C_009 Show message When seller leave “ADMIN API ACCESS TOKEN” field blank', () => {
        shopifyIntegrationPage.clickCancelButton();
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputShopifyApiKey(user.valid.yourShopifyApiKey)
            .inputShopUrl(user.valid.shopUrl)
            .inputWebhook(user.valid.webhookVersion)
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 3);
    })

})