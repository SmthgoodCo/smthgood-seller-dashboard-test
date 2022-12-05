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
    beforeEach(() => {
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

    it('B_066 When seller click “ALL” button, show list products', () => {
        orderPage.clickOrderTabButton(orderPage.allBtn)
            .verifyShowListOrder();
    })

    it('B_067 When seller click “Sort” button, show list sort option', () => {
        orderPage.clickButtonOrerPage(orderPage.sortBtn)
            .verifyShowListSortButton();

    })

    it('B_068 When seller click “Newest first” in list option sort, show Newest Order', () => {
        orderPage.clickButtonOrerPage(orderPage.sortBtn)
            .clickSortOptionButton(orderPage.newestfirstBtn)
            .verifyShowSortOrder(1, 'Newest first', 1);
    })

    it('B_069 When seller click “Oldest first” in list sort, show Oldest Order', () => {
        orderPage.clickButtonOrerPage(orderPage.sortBtn)
            .clickSortOptionButton(orderPage.oldestfirstBtn)
            .verifyShowSortOrder(1, 'Oldest first', 1);
    })

    it('B_070 When seller click “Highest amount” in list sort, show Highest amout Order', () => {
        orderPage.clickButtonOrerPage(orderPage.sortBtn)
            .clickSortOptionButton(orderPage.highestamount)
            .verifyShowSortOrder(3, 'Highest amount', 4);
    })

    it('B_071 When seller click “Lowest amount” in list sort, show Lowest amount Order', () => {
        orderPage.clickButtonOrerPage(orderPage.sortBtn)
            .clickSortOptionButton(orderPage.lowestamount)
            .verifyShowSortOrder(3, 'Lowest amount', 4);
    })

    it('B_072 When seller click “None” in list sort, show ORDER NO follow ASC order', () => {
        orderPage.clickButtonOrerPage(orderPage.sortBtn)
            .clickSortOptionButton(orderPage.noneBtn)
            .verifyShowSortOrder(1, 'None', 1);
    })

    it('B_073 When seller click outside button Sort, turn off list option', () => {
        orderPage.clickButtonOrerPage(orderPage.sortBtn)
            .verifyShowListSortButton()
            .clickOutside()
            .verifyShowListSortButton('Exit');
    })

})