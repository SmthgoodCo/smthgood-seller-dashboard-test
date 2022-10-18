/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { EditProfilePage } = require("../pages/editProfilePage");
import user from "../fixtures/userData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();
const editProfilePage = new EditProfilePage();

describe('Home Page Functionality', () => {
    it('B_001 Display business name in homepage', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
            .verifyInHomePage();
        homePage.verifyDisplaySellerName(user.valid.sellerName);
    });

    //Fail: Messages button don't click
    it.skip('B_003 Show message page in web app When seller click “Messages” button', () => {
        homePage
            .clickMessagesButton()
            .verifyInMessagesPage();
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

    it.only('B_006 Show “Profile” page in web app When seller click “Edit profile”', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
            .verifyInHomePage();
        homePage
            .clickSellerName()
            .clickEditProfileLink()
            .verifyInEditProfilePage();
        editProfilePage.verifyUsername();
    });
});