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
        // cy.clearLocalStorage()
        // cy.clearCookies();
        // cy.getCookies().should('be.empty');
        // sessionStorage.clear();
        // loginPage
        //     .goToLoginPage()
        //     .loginWithUser(user.valid.email, user.valid.password)
        //     .clickLoginButton();
        // homePage
        //     .clickSellerName()
        //     .clickEditProfileLink()
    })
    it.skip('B_006 Show “Profile” page in web app When seller click “Edit profile”', { includeShadowDom: true }, () => {
        homePage.verifyInEditProfilePage();
        editProfilePage
            .clickPasswordField()
            .inputChangePassword();
    });

    // it('B_007 Check again show username correct When Seller change lowercase letter in “Username” filed', { includeShadowDom: true }, () => {
    //     let username = 'testlowercase';
    //     editProfilePage
    //         .inputUsername(username)
    //         .clickSaveButton()
    //         .verifyUsername(username);
    // });

    // it('Passs', { includeShadowDom: true }, () => {
    //     let username = 'mail.com';
    //     editProfilePage
    //     cy.wait(5000);
    //     cy.get("flt-glass-pane").click();
    //     cy.get("flt-glass-pane").shadow()
    //     .find('flt-span').contains('Password')
    //     .parent('flt-paragraph')
    //     .parent('flt-canvas')
    //     .parent('flt-picture')
    //     .next('flt-offset').click({force: true})
    //     .find('flt-span').contains('***').click({force: true})
    // });

    // it.only('click flt-clip-interior', () => {
    //     cy.wait(5000);
    //     cy.get("flt-glass-pane").click();
    //     cy.get("flt-glass-pane").shadow()
    //         .find('flt-paragraph')
    //         // .find('flt-span')
    //         // .contains('ABOUT').parent('flt-paragraph').click({force: true})
    //         .contains('ABOUT').parentsUntil('flt-picture').should('be.visible')
    //         .trigger('mousedown', {clientX: 100, clientY: 100, screenX: 100, screenY: 100, pageX: 100, pageY: 100})
    // .trigger('wheel')
    // .trigger('mousedown', {which: 1})
    // .trigger('wheel', {deltaY: -66.666, bubbles: true})
    // .trigger("wheel",{deltaY: -66.66666, whellDelta: 240, whellDeltaX: 0, whellDeltaY: 240, bubbles: true})
    // .next('flt-offset').click({ force: true })
    // cy.visit('https://seller-smthgood.vinova.sg/orders'), {
    //     onBeforeLoad(win) {
    //         cy.stub(win, open)
    //     }
    // }

    // homePage
    //     .clickSellerName()
    //     .clickLogOutButton()
    // loginPage
    //     .loginWithUser(user.valid.email, user.valid.password)
    //     .clickLoginButton();
    // homePage
    //     .clickSellerName()
    //     .clickEditProfileLink()
    // cy.forceVisit(currentUrL);
    // cy.scrollTo('bottom',{ensureScrollable: false})
    // .trigger('mousedown')
    // .trigger('wheel', {deltaY: -500, force: true})
    // .next('flt-paragraph').click({force: true}).contains('Display Name')
    //     return this;
    // })
})