/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { ProductPage } = require("../pages/productPage");
const { AddProductPage } = require("../pages/addProductPage");
const { ShopifyIntegrationPage } = require("../pages/shopifyIntegrationPage");
import user from "../fixtures/userData.json";
let email = user.valid.email;
let password = user.valid.password;
const loginPage = new LoginPage();
const homePage = new HomePage();
const productPage = new ProductPage();
const addProductPage = new AddProductPage();
const shopifyIntegrationPage = new ShopifyIntegrationPage();

describe('Product Functionality', () => {
    before(() => {
        cy.request({
            method: 'POST',
            url: user.valid.urlAPI + '/api/services/app/tokenauth/login-seller',
            headers: {
                'X-XSRF-TOKEN': user.valid.accessToken
            },
            body: {
                emailAddress: email,
                password: password,
            }
        })
            .should((response) => {
                cy.request({
                    method: 'GET',
                    url: user.valid.urlAPI + '/api/services/seller/shopify/reset-integrate',
                    failOnStatusCode: false,
                    headers: {
                        'X-XSRF-TOKEN': user.valid.accessToken,
                        'Authorization': 'Bearer ' + response.body.result.accessToken
                    },
                })
                    .should((response) => {
                        expect(response.status).to.not.eq(401);

                    });

            });

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

    it('C_002 Show Products - empty When seller click PRODUCTS', () => {
        homePage.clickProductsOnMenu();
        productPage
            .verifyShowlistProduct();
    })

    it('C_003 When seller click “Add Product” button in product list page, show add product page', () => {
        homePage.clickProductsOnMenu();
        productPage
            .clickAddProductButton();
        addProductPage.verifyShowAddProductPage();
    })

    it('C_004 When seller click “back” icon left side Add Product, show product list page', () => {
        addProductPage.clickBackIcon();
        productPage.verifyShowProductPage();
    })

    it('C_005 When seller leave “TITLE” field blank, show warning message', () => {
        productPage.clickAddProductButton();
        addProductPage.clickSaveButton()
            .verifyShowMessageEmptyTitle();
    })

    // <p class="MuiTypography-root jss976 MuiTypography-body1">Create failed, please check again!</p>

})