/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { EditProfilePage } = require("../pages/editProfilePage");
import user from "../fixtures/userData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();
const editProfilePage = new EditProfilePage();

describe('Edit Profile Functionality', () => {
    // before(() => {
    //     cy.clearCookies();
    //     cy.getCookies().should('be.empty');
    //     sessionStorage.clear();
    //     loginPage
    //         .goToLoginPage()
    //         .loginWithUser(user.valid.email, user.valid.password)
    //         .clickLoginButton();
    //     homePage
    //         .clickSellerName()
    //         .clickEditProfileLink()
    // })
    it.skip('B_006 Show “Profile” page in web app When seller click “Edit profile”', { includeShadowDom: true }, () => {
        homePage.verifyInEditProfilePage();
        editProfilePage.verifyShowEditProfilePage();
    });

    it.skip('B_007 Seller change lowercase letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = 'testlowercase';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton();
        editProfilePage.verifyUsername(username);
    });
    // it('B_007 Check again show username correct When seller change lowercase letter in “Username” filed', { includeShadowDom: true }, () => {
    //     let username = 'testlowercase';
    //     editProfilePage.verifyUsername(username);
    // });

    it.skip('B_008 Seller change uppercase letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = 'TESTUPPERCASE';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton();
    });

    it.skip('B_008 Check again show username correct When seller change uppercase letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = 'TESTUPPERCASE';
        editProfilePage.verifyUsername(username);
    });

    it.skip('B_009 Seller change number letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = '12345332';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton();
    });

    it.skip('B_009 check again show username correct When seller change number letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = '12345332';
        editProfilePage.verifyUsername(username);
    });

    it.skip('B_009 Show message When seller change special character “Username” filed', { includeShadowDom: true }, () => {
        editProfilePage
            .inputUsername('##@$%#')
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.')
    });

    it.skip('B_010 Show message When seller change the “Username” with dot(.) in the top', { includeShadowDom: true }, () => {
        editProfilePage
            .inputUsername('.Baosmth')
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });
})