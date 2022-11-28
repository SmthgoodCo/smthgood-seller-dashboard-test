/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { OrderPage } = require("../pages/orderPage");
import user from "../fixtures/userData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();
const orderPage = new OrderPage();

describe('OrderPage First Login Functionality', () => {

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

describe('OrderPage Functionality', () => {
    it('B_053 When seller have order, show list order', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
            .verifyInHomePage();
        orderPage.verifyShowListOrder();
    })

    it('B_054 Show the number “At a glance” is 0, when it doesn’t have order', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
            .verifyInHomePage();
        orderPage.verifyShowListOrder();
    })

})