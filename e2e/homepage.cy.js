/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
import user from "../fixtures/userData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();

describe('Home Page Functionality', () => {
    // beforeEach(function () {
    //     loginPage.goToLoginPage();
    // });

    it('B_001 Display business name in homepage', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
            .verifyInHomePage();
        homePage.verifyDisplaySellerName(user.valid.sellerName);
    });

    it.skip('B_002 Show inbox gmail When seller click “Help” button', () => {
        homePage.clickHelpButton();
    });

    it('B_004 Show dropdown When seller click name seller', () => {
        homePage
            .clickSellerName()
            .verifyInformationDropdown();
    });

    it('B_005 Turn off dropdown popup When seller click outside dropdown', () => {
        homePage
            .clickOutsideDropdown()
            .verifyTurnOffDropdownPopup();
    });

    // it('Handling new Browser Window', function () {
    //     cy.visit('https://app-smthgood.vinova.sg/profile/edit-profile?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU210aEdvb2QiLCJTbXRoR29vZDpJZCI6Ijk0MCIsIlNtdGhHb29kOlZlbmRvcklkIjoiMzc3IiwibmJmIjoxNjY2MDAyNjYxLCJleHAiOjE2NjYwMDg2NjEsImlzcyI6IlNtdGhHb29kT25lVGltZSIsImF1ZCI6IlNtdGhHb29kT25lVGltZSJ9.xUfbI375ZyLG12nP5rkP5LWL0YIL6j4pn7mfZ3STXck');

    //     homePage.clickEditProfileLink();
    // });

    // it.only('Handling new Browser Window', function () {
    //     // cy.visit('https://app-smthgood.vinova.sg/profile/edit-profile?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU210aEdvb2QiLCJTbXRoR29vZDpJZCI6Ijk0MCIsIlNtdGhHb29kOlZlbmRvcklkIjoiMzc3IiwibmJmIjoxNjY2MDAyNjYxLCJleHAiOjE2NjYwMDg2NjEsImlzcyI6IlNtdGhHb29kT25lVGltZSIsImF1ZCI6IlNtdGhHb29kT25lVGltZSJ9.xUfbI375ZyLG12nP5rkP5LWL0YIL6j4pn7mfZ3STXck');
    //     loginPage
    //         .goToLoginPage()
    //         .loginWithUser(user.valid.email, user.valid.password)
    //         .clickLoginButton()
    //         .verifyInHomePage();
    //     homePage
    //         .verifyDisplaySellerName(user.valid.sellerName)
    //         .clickSellerName();

    //     cy.window().then((win) => {
    //         cy.stub(win, 'open', url => {
    //             win.location.href = '../';
    //             // win.location.href = 'https://app-smthgood.vinova.sg/profile/edit-profile?/';
    //         }).as("popup")
    //     })
    //     homePage.clickEditProfileLink();
    // })
});