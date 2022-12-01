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
        orderPage.verifyShowOrderEmptyText();
    })
})

describe('OrderPage Functionality', () => {
    beforeEach(()=>{
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
            .verifyInHomePage();
    })

    it('B_053 When seller have order, show list order', () => {
        orderPage.verifyShowListOrder();
    })

    it('B_054 Show the number “At a glance” is 0, when it doesn’t have order', () => {
        orderPage.clickOrderTabButton(orderPage.orderReceived)
            .verifyShowNumberAtAGlance(0);
    })

    it('B_055 Show the number “At a glance”, when it has order', () => {
        orderPage.clickOrderTabButton(orderPage.orderReceived)
            .verifyShowNumberAtAGlance(0);
    })

    it('B_056 When seller click “ORDERS RECEIVED”, show “Orders empty” if doesn’t have status is Orders Received', () => {
        orderPage.clickOrderTabButton(orderPage.orderReceived)
            .verifyOrderInOrderTable(0, orderPage.orderReceived);
    })

    it('B_057 When seller click “ORDERS RECEIVED”, show orders has status is Orders Received', () => {
        orderPage.clickOrderTabButton(orderPage.orderReceived)
            .verifyOrderInOrderTable(0, orderPage.orderReceived);
    })

    it('B_058 When seller click “SHIPPED”, show “Orders empty” if doesn’t have status is Shipped', () => {
        orderPage.clickOrderTabButton(orderPage.shipped)
            .verifyOrderShippingInOrderTable();
    })

    it('B_059 When seller click “SHIPPED”, show orders has status is Shipped', () => {
        orderPage.clickOrderTabButton(orderPage.shipped)
            .verifyOrderShippingInOrderTable();
    })

    it('B_060 When seller click “COMPLETED”, show “Orders empty” if doesn’t have status is Completed', () => {
        orderPage.clickOrderTabButton(orderPage.completed)
            .verifyOrderInOrderTable(1, orderPage.completed);
    })

    it('B_061 When seller click “COMPLETED”, show orders has status is Completed', () => {
        orderPage.clickOrderTabButton(orderPage.completed)
            .verifyOrderInOrderTable(1, orderPage.completed);
    })

    it('B_062 When seller click “CANCELLED”, show “Orders empty” if doesn’t have status is Cancelled', () => {
        orderPage.clickOrderTabButton(orderPage.cancelled)
            .verifyOrderInOrderTable(2, orderPage.cancelled);
    })

    it('B_063 When seller click “CANCELLED”, show orders has status is Cancelled', () => {
        orderPage.clickOrderTabButton(orderPage.cancelled)
            .verifyOrderInOrderTable(2, orderPage.cancelled);
    })

    it('B_064 When seller click “REFUNDED”, show “Orders empty” if doesn’t have status is Refunded', () => {
        orderPage.clickOrderTabButton(orderPage.refunded)
            .verifyOrderInOrderTable(3, orderPage.refunded);
    })

    it('B_065 When seller click “REFUNDED”, show orders has status is Refunded', () => {
        orderPage.clickOrderTabButton(orderPage.refunded)
            .verifyOrderInOrderTable(3, orderPage.refunded);
    })

})