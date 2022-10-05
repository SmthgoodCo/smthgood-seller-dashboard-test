/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { ResetPasswordPage } = require("../pages/resetPasswordPage");
import user from "../fixtures/userData.json";
import { getRandomEmail, getRandomNumber, getRandomText } from "../support/functionCommon";

const loginPage = new LoginPage();
const resetPasswordPage = new ResetPasswordPage();

describe.skip("Forgot Password Functionality", () => {
    beforeEach(() => {
        loginPage.goToLoginPage();
    });

    it("C001 Display forgot password page when seller click “Forgot password”", () => {
        loginPage.clickForgotPasswordLink();
        resetPasswordPage.verifyInResetPasswordPage();
    });

    it('C002 Display forgot password page when seller after 5 attempts wrong email', () => {
        let randomEmail = getRandomEmail();
        loginPage.clickLoginButtonIn5Attempts(randomEmail, user.valid.password);
        resetPasswordPage.verifyInResetPasswordPage();
    })

    it('C003 Display forgot password page when seller after 5 attempts wrong password', () => {
        let randomPassword = getRandomText();
        loginPage.clickLoginButtonIn5Attempts(user.valid.email, randomPassword);
        resetPasswordPage.verifyInResetPasswordPage();
    })

    it('C004 Display forgot password page when seller after 5 attempts wrong email and password', () => {
        let randomEmail = getRandomEmail();
        let randomPassword = getRandomText();
        loginPage.clickLoginButtonIn5Attempts(randomEmail, randomPassword);
        resetPasswordPage.verifyInResetPasswordPage();
    })

    it('C005 Shows validation messages when seller leave email field', () => {
        loginPage.clickForgotPasswordLink();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputEmailAddress()
            .clickResetPasswordButton()
            .verifyShowErrorMsg("Email cannot be empty");
    })

    it('C006 Shows validation messages when seller enter space email field', () => {
        loginPage.clickForgotPasswordLink();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputEmailAddress('  ')
            .clickResetPasswordButton()
            .verifyShowErrorMsg('Email invalid');
    })

    it('C007 Shows validation messages when seller enter text email filed', () => {
        let randomText = getRandomText();
        loginPage.clickForgotPasswordLink();
        resetPasswordPage.verifyInResetPasswordPage()
            .inputEmailAddress(randomText)
            .clickResetPasswordButton()
            .verifyShowErrorMsg('Email invalid');
    })

    it('C008 Shows validation messages when seller enter number email filed', () => {
        let randomNumber = getRandomNumber();
        loginPage.clickForgotPasswordLink();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputEmailAddress(randomNumber)
            .clickResetPasswordButton()
            .verifyShowErrorMsg('Email invalid');
    })

    it('C009 Shows validation messages when seller enter special character email filed', () => {
        loginPage.clickForgotPasswordLink();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputEmailAddress('%^%#$%')
            .clickResetPasswordButton()
            .verifyShowErrorMsg('Email invalid');
    })

    it('C010 Shows validation messages when seller enter email that does not exist', () => {
        let randomEmail = getRandomEmail()
        loginPage.clickForgotPasswordLink();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputEmailAddress(randomEmail)
            .clickResetPasswordButton()
            .verifyShowErrorMsg('Email address not found');
    })

    it('C011 Display “Password reset success” page when seller enter valid email filed', () => {
        loginPage.clickForgotPasswordLink();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputEmailAddress(user.valid.email)
            .clickResetPasswordButton()
            .verifyPasswordResetSuccessPage();
    })

    it('C012 Show login page when seller click “OK!” button', () => {
        loginPage.clickForgotPasswordLink();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputEmailAddress(user.valid.email)
            .clickResetPasswordButton()
            .verifyPasswordResetSuccessPage()
            .clickOKButton();
        loginPage.verifyInLoginPage();
    })
})

