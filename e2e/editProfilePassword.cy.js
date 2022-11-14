/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { EditProfilePage } = require("../pages/editProfilePage");
import user from "../fixtures/userData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();
const editProfilePage = new EditProfilePage();

describe('Edit Profile Functionality', () => {
    before(() => {
        cy.clearLocalStorage()
        cy.clearCookies();
        cy.getCookies().should('be.empty');
        sessionStorage.clear();
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton();
    })
    it.skip('B_006 Show “Profile” page in web app When seller click “Edit profile”', { includeShadowDom: true }, () => {
        homePage.verifyInEditProfilePage();
        editProfilePage
            .clickPasswordField()
            .inputChangePassword();
    });
})