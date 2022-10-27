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
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton();
    })
    it('B_006 Show “Profile” page in web app When seller click “Edit profile”', { includeShadowDom: true }, () => {
        homePage
            .clickSellerName()
            .clickEditProfileLink()
            .verifyInEditProfilePage();
        editProfilePage.verifyShowEditProfilePage();
    });

    it('B_007 check again show username correct When seller change lowercase letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = 'baosmth';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton();
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton();
        homePage
            .clickSellerName()
            .clickEditProfileLink();
        editProfilePage.verifyUsername(username);
    });

    it('B_008 check again show username correct When seller change uppercase letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = 'BAOSMTH';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton();
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton();
        homePage
            .clickSellerName()
            .clickEditProfileLink();
        editProfilePage.verifyUsername(username);
    });

    it('B_009 check again show username correct When seller change number letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = '12345332';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton();
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton();
        homePage
            .clickSellerName()
            .clickEditProfileLink();
        editProfilePage.verifyUsername(username);
    });

    it('B_009 Show message When seller change special character “Username” filed', { includeShadowDom: true }, () => {
        editProfilePage
            .inputUsername('##@$%#')
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters. The length must be between 3 and 30 characters. Not allowed to have two or more consecutive dots in a row. Not allowed to start or end the username with a dot or underline')
    });

    it('B_010 Show message When seller change the “Username” with dot(.) in the top', { includeShadowDom: true }, () => {
        editProfilePage
            .inputUsername('.Baosmth')
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters. The length must be between 3 and 30 characters. Not allowed to have two or more consecutive dots in a row. Not allowed to start or end the username with a dot or underline');
    });

})