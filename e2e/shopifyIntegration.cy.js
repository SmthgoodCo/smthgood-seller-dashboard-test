/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { ProductPage } = require("../pages/productPage");
const { ShopifyIntegrationPage } = require("../pages/shopifyIntegrationPage");
const { ShopifyIntegrationPopupPage } = require("../pages/shopifyIntegrationPopupPage");
import user from "../fixtures/userData.json";
let email = user.valid.email;
let password = user.valid.password;
const loginPage = new LoginPage();
const homePage = new HomePage();
const productPage = new ProductPage();
const shopifyIntegrationPage = new ShopifyIntegrationPage();
const shopifyIntegrationPopupPage = new ShopifyIntegrationPopupPage();

describe('Shopify with Integration Functionality', () => {
    before(() => {
        // cy.request({
        //     method: 'POST',
        //     url: user.valid.urlAPI + '/api/services/app/tokenauth/login-seller',
        //     headers: {
        //         'X-XSRF-TOKEN': user.valid.accessToken
        //     },
        //     body: {
        //         emailAddress: email,
        //         password: password,
        //     }
        // })
        //     .should((response) => {
        //         cy.request({
        //             method: 'GET',
        //             url: user.valid.urlAPI + '/api/services/seller/shopify/reset-integrate',
        //             failOnStatusCode: false,
        //             headers: {
        //                 'X-XSRF-TOKEN': user.valid.accessToken,
        //                 'Authorization': 'Bearer ' + response.body.result.accessToken
        //             },
        //         })
        //             .should((response) => {
        //                 expect(response.status).to.not.eq(401);

        //             });

        //     });

        loginPage
            .goToLoginPage()
            .loginWithUser(email, password)
            .clickLoginButton()
            .verifyInHomePage();
        homePage.clickProductsOnMenu();
        productPage.clickIntegrateWithShopifyButton();
    })

    it('C_003 Show “Integrate with Shopify” popup When seller click “Integrate with Shopify” button in product list page', () => {
        shopifyIntegrationPage.verifyShowIntegrateWithShopifyPopup();
    })

    it('C_004 Open new tab and show “Shopify Integration” page When seller click “here” tab in “Integrate with Shopify” page', () => {
        shopifyIntegrationPage
            .clickHereLink()
            .verifyShowShopifyIntegrationPage();
    })

    it('C_005 Show image When seller click left arrow icon', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(email, password)
            .clickLoginButton()
        homePage.clickProductsOnMenu();
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .clickArrowIconButon('left')
    })

    it('C_006 Show image When seller click right arrow icon', () => {
        shopifyIntegrationPage
            .clickArrowIconButon('right')
    })

    it('C_007 Show list product page When seller click cancel button', () => {
        shopifyIntegrationPage
            .clickCancelButton();
        productPage
            .verifyShowlistProduct();
    })

    it('C_008 Show message When seller leave “YOUR SHOPIFY API KEY” field blank', () => {
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                '',
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 1);
    })

    it('C_009 Show message When seller leave “ADMIN API ACCESS TOKEN” field blank', () => {
        shopifyIntegrationPage.clickCancelButton();
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                '',
                user.valid.shopUrl,
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 3);
    })

    it('C_010 Show Intergration Error popup When seller enter space in “ADMIN API ACCESS TOKEN” field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                ' ',
                user.valid.shopUrl,
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please double check Admin API Access token');
    })

    it('C_011 Show Intergration Error popup When seller enter number in “ADMIN API ACCESS TOKEN” field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                '123456789',
                user.valid.shopUrl,
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please double check Admin API Access token');
    })

    it('C_012 Show Intergration Error popup When seller enter special character in “ADMIN API ACCESS TOKEN” field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                '!@#$%^&*',
                user.valid.shopUrl,
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please double check Admin API Access token');
    })

    it('C_013 Show Intergration Error popup When seller enter invalid in “ADMIN API ACCESS TOKEN” field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                'ABC 123!@#',
                user.valid.shopUrl,
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please double check Admin API Access token');
    })

    it('C_014 Show message When seller leave “SHOP URL” field blank', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                '',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 5);
    })

    it('C_015 Show Integration Error popup When seller enter space in “SHOP URL” field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                ' ',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_016 Show Integration Error popup When seller enter number in “SHOP URL” field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                '123456789',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_017 Show message When seller enter special character in “SHOP URL” field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                '!@#$%^&*',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_018 Show message When seller enter invalid in “SHOP URL” field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                'http:/ABCD 123!@#.store,com/',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_019 Show message When seller doesn’t enter http:// link in “SHOP URL” field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                '//gavin-storee.myshopify.com/',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_020 Show message When seller leave “WEBHOOK VERSION” field blank', () => {
        shopifyIntegrationPage
            .clickCancelButton();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                ''
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 7);
    })

    it('C_021 Show Intergration Error popup When seller enter space in “WEBHOOK VERSION” field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                ' '
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please double check Webhook Version');
    })

    it('C_022 Show Intergration Error popup When seller enter number in “WEBHOOK VERSION” field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                '123456789'
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please double check Webhook Version');
    })

    it('C_023 Show Intergration Error popup When seller enter special character in “WEBHOOK VERSION” field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                '!@#$%^&*'
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please double check Webhook Version');
    })

    it('C_024 Show Intergration Error popup When seller enter invalid in “WEBHOOK VERSION” field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                'ABCD-10'
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please double check Webhook Version');
    })

    it('C_025 Show Integration Completed popup When seller enter valid all field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('', true);
    })

    it('C_026 Show message When seller leave all field blank', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo()
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 1)
            .verifyShowErrorMsg('Field cannot be empty', 3)
            .verifyShowErrorMsg('Field cannot be empty', 5)
            .verifyShowErrorMsg('Field cannot be empty', 7);
    })

    it('C_027 Show message When seller leave “YOUR SHOPIFY API KEY” and “ADMIN API ACCESS TOKEN” field blank', () => {
        shopifyIntegrationPage
            .clickCancelButton();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                '',
                '',
                user.valid.shopUrl,
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 1)
            .verifyShowErrorMsg('Field cannot be empty', 3);
    })

    it('C_028 Show message When seller leave “YOUR SHOPIFY API KEY” and “SHOP URL” field blank', () => {
        shopifyIntegrationPage
            .clickCancelButton();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                '',
                user.valid.adminApiAccessToken,
                '',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 1)
            .verifyShowErrorMsg('Field cannot be empty', 5);
    })

    it('C_029 Show message When seller leave “YOUR SHOPIFY API KEY” and “WEBHOOK VERSION” field blank', () => {
        shopifyIntegrationPage
            .clickCancelButton();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                '',
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                ''
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 1)
            .verifyShowErrorMsg('Field cannot be empty', 7);
    })

    it('C_030 Show message When seller leave “ADMIN API ACCESS TOKEN” and “SHOP URL” field blank', () => {
        shopifyIntegrationPage
            .clickCancelButton();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                '',
                '',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 3)
            .verifyShowErrorMsg('Field cannot be empty', 5);
    })

    it('C_031 Show message When seller leave “SHOP URL” and “WEBHOOK VERSION” field blank', () => {
        shopifyIntegrationPage
            .clickCancelButton();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                '',
                ''
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Field cannot be empty', 5)
            .verifyShowErrorMsg('Field cannot be empty', 7);
    })

    it('C_032 Show Integration Error popup When seller enter invalid “YOUR SHOPIFY API KEY” and “ADMIN API ACCESS TOKEN” field', () => {
        shopifyIntegrationPage
            .clickCancelButton();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                'ABC 123!@#',
                'ABC 123!@#',
                user.valid.shopUrl,
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please double check Admin API Access token');
    })

    it('C_033 Show message When seller enter invalid “YOUR SHOPIFY API KEY” and “SHOP URL” field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                'ABC',
                user.valid.adminApiAccessToken,
                'http:/ABCD 123!@#.store,com/',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_034 Show Integration Error popup When seller enter invalid “YOUR SHOPIFY API KEY” and “WEBHOOK VERSION” field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                'ABC 123!@#',
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                'ABCD-10'
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please check that your Webhook Version');
    })

    it('C_035 Show message When seller enter invalid “ADMIN API ACCESS TOKEN” and “SHOP URL” field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                'ABC 123!@#',
                'http:/ABCD 123!@#.store,com/',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_036 Show Integration Error popup When seller enter invalid “ADMIN API ACCESS TOKEN” and “WEBHOOK VERSION” field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                'ABC 123!@#',
                user.valid.shopUrl,
                'ABCD-10'
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please check that your Admin API Access Token and Webhook Version');
    })

    it('C_037 Show message When seller enter invalid “SHOP URL” and “WEBHOOK VERSION” field', () => {
        shopifyIntegrationPopupPage
            .clickOkButon();
        productPage
            .clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                user.valid.adminApiAccessToken,
                'http:/ABCD 123!@#.store,com/',
                'ABC 123!@#'
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_038 Show message When seller enter valid “YOUR SHOPIFY API KEY” and invalid remaining field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                user.valid.yourShopifyApiKey,
                'ABC 123!@#',
                'http:/ABCD 123!@#.store,com/',
                'ABCD-10'
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it.skip('C_039 Show message When seller enter valid “ADMIN API ACCESS TOKEN” and invalid remaining field', () => {
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                'ABC 123!@#',
                user.valid.adminApiAccessToken,
                'http:/ABCD 123!@#.store,com/',
                'ABCD-10'
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_040 Show Integration Error popup When seller enter valid “SHOP URL” and invalid remaining fields', () => {
        shopifyIntegrationPage.clickCancelButton();
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                'ABC 123!@#',
                'ABC 123!@#',
                user.valid.shopUrl,
                'ABCD-10'
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage.verifyShowIntegrationPopup('Please check that your Admin API Access Token and Webhook Version');
    })

    it('C_041 Show message When seller enter valid “WEBHOOK VERSION” and invalid remaining fields', () => {
        shopifyIntegrationPopupPage.clickOkButon();
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                'ABC 123!@#',
                'ABC 123!@#',
                'http:/ABCD 123!@#.store,com/',
                user.valid.webhookVersion
            )
            .clickStartIntegrationButton()
            .verifyShowErrorMsg('Shop URL should be https', 5);
    })

    it('C_042 Show list product When seller click “Cancel” button in Integrate with Shopify popup', () => {
        shopifyIntegrationPage.clickCancelButton();
        shopifyIntegrationPage.verifyDisAppearIntegrateWithShopify();
        productPage.verifyShowlistProduct();
    })

    it('C_043 Show list product When seller click “Close” icon in Integration with shopify popup', () => {
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .verifyShowIntegrateWithShopifyPopup()
            .clickCloseIconButton();
        shopifyIntegrationPage.verifyDisAppearIntegrateWithShopify();
        productPage.verifyShowlistProduct();
    })

    it('C_044 Show popup confirm “Stop the integration?” When seller click “Close” icon in Integrating popup', () => {
        productPage.clickIntegrateWithShopifyButton();
        shopifyIntegrationPage
            .inputIntegrateShopifyInfo(
                'ABC 123!@#',
                user.valid.adminApiAccessToken,
                user.valid.shopUrl,
                'ABCD-10'
            )
            .clickStartIntegrationButton();
        shopifyIntegrationPopupPage
            .clickCloseIconButton()
            .verifyShowStopPopupConfirm();
    })
})