/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { OrderPage } = require("../pages/orderPage");
import user from "../fixtures/userData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();
const orderPage = new OrderPage();

describe('OrderPage Functionality', () => {

    it('B_051 show “Order - empty” page When seller fist login page', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email1, user.valid.password1)
            .clickLoginButton()
            .verifyInHomePage();
        orderPage.verifyShowOrderEmptyText();
    })

    it('B_052 show “Order - empty” page When seller doesn’t have order', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email1, user.valid.password1)
            .clickLoginButton()
            .verifyInHomePage();
        orderPage.verifyOrderReceivedEmpty();
    })

})