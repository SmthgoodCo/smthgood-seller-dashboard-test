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
        homePage
            .clickSellerName()
            .clickEditProfileLink()
    })
    it('B_006 Show “Profile” page in web app When seller click “Edit profile”', { includeShadowDom: true }, () => {
        homePage.verifyInEditProfilePage();
        editProfilePage.verifyShowEditProfilePage();
    });

    it('B_007 Check again show username correct When Seller change lowercase letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = 'testlowercase';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton()
            .verifyUsername(username);
    });

    it('B_008 Check again show username correct When Seller change uppercase letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = 'TESTUPPERCASE';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton()
            .verifyUsername(username);

    });

    it('B_009 Check again show username correct When seller change number letter in “Username” filed', { includeShadowDom: true }, () => {
        let username = '12345332';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton();
        editProfilePage.verifyUsername(username);
    });

    it('B_009 Show message When seller change special character “Username” filed', { includeShadowDom: true }, () => {
        editProfilePage
            .inputUsername('##@$%#')
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.')
    });

    it('B_010 Show message When seller change the “Username” with dot(.) in the top', { includeShadowDom: true }, () => {
        editProfilePage
            .inputUsername('testlowercase')
            .clickSaveButton()
            .inputUsername('.Baosmth')
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_011 check again show username correct When seller change the “Username” with dot(.) in between', { includeShadowDom: true }, () => {
        let username = 'testdot.between';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton()
            .verifyUsername(username);
    });

    it('B_012 Show message When seller change the “Username” with dot(.) at the end', { includeShadowDom: true }, () => {
        let username = 'dotatheend.';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_013 Show message When seller change the “Username” with underline(_) in the top', { includeShadowDom: true }, () => {
        let username = '_underlinetop';
        editProfilePage
            .inputUsername('testusername')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_014 Check again show username correct When seller change the “Username” with underline(_) in between', { includeShadowDom: true }, () => {
        let username = 'underlinetop_between';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton()
            .verifyUsername(username);
    });

    it('B_015 Show message When seller change the “Username” with underline(_) in the end', { includeShadowDom: true }, () => {
        let username = 'underlineend_';
        editProfilePage
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_016 Show message When seller change the “Username” with 2 consecutive dots in the top', { includeShadowDom: true }, () => {
        let username = '..twodotsinthetop';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_017 Show message When seller change the “Username” with 2 consecutive dots in between', { includeShadowDom: true }, () => {
        let username = 'twodots..inbetween';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_018 Show message When seller change the “Username” with 2 consecutive dots at the end', { includeShadowDom: true }, () => {
        let username = 'twodotsattheend..';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_019 Show message When seller change the “Username” with more consecutive dots in the top', { includeShadowDom: true }, () => {
        let username = '....moredotsinthetop';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_020 Show message When seller change the “Username” with more consecutive dots in between', { includeShadowDom: true }, () => {
        let username = 'moredots....inbetween';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_021 Show message When seller change the “Username” with more consecutive dots at the end', { includeShadowDom: true }, () => {
        let username = 'moredotsattheend....';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_022 Show message When seller change “Username” filed with enter only space', { includeShadowDom: true }, () => {
        let username = '   ';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_023 Show message When seller change “Username” filed with enter space in between text', { includeShadowDom: true }, () => {
        let username = 'space  inbetween';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_024 Show message When seller change “Username” filed with enter space in between number', { includeShadowDom: true }, () => {
        let username = '1212  323232';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_025 Show message When seller change “Username” filed with enter space in between special character', { includeShadowDom: true }, () => {
        let username = '##@   $%#';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    it('B_026 Show message When seller change “Username” filed with enter space in between text and number', { includeShadowDom: true }, () => {
        let username = 'spacetextnumber   123';
        editProfilePage
            .inputUsername('usernametest')
            .clickSaveButton()
            .inputUsername(username)
            .clickSaveButton()
            .verifyErrorMsg('You can use a-z, A-Z, 0-9, dot(.) and underline(_) characters.The length must be between 3 and 30 characters.Not allowed to have two or more consecutive dots in a row.Not allowed to start or end the username with a dot or underline.');
    });

    // it.only('Email', { includeShadowDom: true }, () => {
    //     let username = 'mail.com';
    //     editProfilePage
    //     cy.wait(5000);
    //     cy.get("flt-glass-pane").click();
    //     cy.get("flt-glass-pane").shadow()
    //     .find('flt-span').contains('Email')
    //     .parent('flt-paragraph')
    //     .parent('flt-canvas')
    //     .parent('flt-picture')
    //     .next('flt-offset').click({force: true})
    //     .find('flt-span').contains('@').click({force: true})
    // });

    // it.only('click flt-clip-interior', () => {
    //     cy.wait(5000);
    //     cy.get("flt-glass-pane").click();
    //     cy.get("flt-glass-pane").shadow()
    //         .find('flt-paragraph')
    //         // .find('flt-span')
    //         .contains('ABOUT').parent('flt-paragraph').click({force: true})
    //         // .trigger("wheel", {deltaY: -66.66666, whellDelta: 240, whellDeltaX: 0, whellDeltaY: 240, bubbles: true})
    //         cy.scrollTo('bottom',{ensureScrollable: false})
    //         // .trigger('mousedown')
    //         // .trigger('wheel', {deltaY: -500, force: true})
    //         // .next('flt-paragraph').click({force: true}).contains('Display Name')
    //     return this;
    // })
})