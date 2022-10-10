/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { ResetPasswordPage } = require("../pages/resetPasswordPage");
const { ForgotPasswordPage } = require("../pages/forgotPasswordPage");
import user from "../fixtures/userData.json";
import { 
    accessLinkFromEmail, 
    checkEmail, 
    checkContentEmail, 
    getEmail } from "../support/functionCommon";

const loginPage = new LoginPage();
const resetPasswordPage = new ResetPasswordPage();
const forgotPasswordPage = new ForgotPasswordPage();

describe('Reset Password Functionality', () => {
    beforeEach(() => {
        // loginPage.goToLoginPage();
    });

    it('A039 Receive notification email and click notification email When seller enter valid email success', () => {
        loginPage
            .goToLoginPage()
            .clickForgotPasswordLink();
        forgotPasswordPage
            .verifyInForgotPasswordPage()
            .inputEmailAddress(user.valid.email)
            .clickResetPasswordButton()
            .verifyPasswordResetSuccessPage();
        getEmail();
    })

    it('A040 Receive notification email and display in gmail When seller enter valid email success', () => {
        checkEmail();
    })

    it('A041 Display content in ‘Reset password” email', () => {
        checkContentEmail();
    })

    it('A042 Show “Reset password” page When seller click “Reset your password”', () => {
        loginPage
            .goToLoginPage()
            .clickForgotPasswordLink();
        forgotPasswordPage
            .inputEmailAddress(user.valid.email)
            .clickResetPasswordButton()
            .verifyPasswordResetSuccessPage();
        accessLinkFromEmail();
        resetPasswordPage.verifyInResetPasswordPage();
    })

    it("A043 Shows messages When seller leave new password filed blank", () => {
        resetPasswordPage
            .inputConfirmNewPassword("Linda@123")
            .clickConfirmButton()
            .verifyShowErrorMsg("Password cannot be empty")
            .verifyShowErrorMsg("Your password does not match"); //Expected Results Exel File: "You password does not match" 
    });

    it("A044 Shows messages When seller enter under 8 character new password filed", () => {
        resetPasswordPage
            .inputNewPassword("12345")
            .inputConfirmNewPassword("Linda@123")
            .clickConfirmButton()
            .verifyShowErrorMsg("Your password must have at least 8 characters")
            .verifyShowErrorMsg("Your password does not match");
    });

    it("A045 Show “Password reset success” page When seller enter 8 character new password filed, ", () => {
        resetPasswordPage
            .inputNewPassword("Linda123")
            .inputConfirmNewPassword("Linda123")
            .clickConfirmButton()
            .verifyPasswordResetSuccessPage();
    });

    it("A046 Shows messages When seller enter 8 character new password filed", () => {
        loginPage
            .goToLoginPage()
            .clickForgotPasswordLink();
        forgotPasswordPage
            .inputEmailAddress(user.valid.email)
            .clickResetPasswordButton()
            .verifyPasswordResetSuccessPage();
        accessLinkFromEmail();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputNewPassword("Linda123")
            .inputConfirmNewPassword("Lindaaaa")
            .clickConfirmButton()
            .verifyShowErrorMsg("Your password does not match");
    });

    it("A047 Show “Password reset success” page When seller enter least 8 character new password filed, ", () => {
        resetPasswordPage
            .inputNewPassword("Linda@123")
            .inputConfirmNewPassword("Linda@123")
            .clickConfirmButton()
            .verifyPasswordResetSuccessPage();
    });

    it("A048 Shows messages When seller enter least 8 character new password filed", () => {
        loginPage
            .goToLoginPage()
            .clickForgotPasswordLink();
        forgotPasswordPage
            .inputEmailAddress(user.valid.email)
            .clickResetPasswordButton()
            .verifyPasswordResetSuccessPage();
        accessLinkFromEmail();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputNewPassword("Linda@123")
            .inputConfirmNewPassword("Linda@123456")
            .clickConfirmButton()
            .verifyShowErrorMsg("Your password does not match");
    });

    it("A049 Shows messages When seller leave password again field", () => {
        loginPage
            .goToLoginPage()
            .clickForgotPasswordLink();
        forgotPasswordPage
            .inputEmailAddress(user.valid.email)
            .clickResetPasswordButton()
            .verifyPasswordResetSuccessPage();
        accessLinkFromEmail();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputNewPassword("Linda123")
            .clickConfirmButton()
            .verifyShowErrorMsg("Confirm new password cannot be empty");
    });

    it("A050 Shows messages When seller enter under 8 character password again filed", () => {
        resetPasswordPage
            .inputNewPassword("Linda@123")
            .inputConfirmNewPassword("Linda")
            .clickConfirmButton()
            .verifyShowErrorMsg("Your password does not match");
    });

    // Test Data A0051 the same A0047
    it("A051 Show “Password reset success” page When seller enter password again the same new password, ", () => {
        resetPasswordPage
            .inputNewPassword("Linda@123")
            .inputConfirmNewPassword("Linda@123")
            .clickConfirmButton()
            .verifyPasswordResetSuccessPage();
    });

    it("A052 Shows messages When seller leave new password and password again filed blank", () => {
        loginPage
            .goToLoginPage()
            .clickForgotPasswordLink();
        forgotPasswordPage
            .inputEmailAddress(user.valid.email)
            .clickResetPasswordButton()
            .verifyPasswordResetSuccessPage();
        accessLinkFromEmail();
        resetPasswordPage
            .verifyInResetPasswordPage()
            .inputConfirmNewPassword("")
            .clickConfirmButton()
            .verifyShowErrorMsg("Password cannot be empty")
            .verifyShowErrorMsg("Confirm new password cannot be empty");
    });

    it("A053 Show password When seller click “Eye” icon in new password filed", () => {
        resetPasswordPage
            .inputNewPassword("Linda123")
            .inputConfirmNewPassword("")
            .clickShowNewPasswordButton("Linda123");
    });

    it("A054 Show password When seller click “Eye” icon in password again filed", () => {
        resetPasswordPage
            .inputNewPassword("")
            .inputConfirmNewPassword("Linda123")
            .clickShowConfirmNewPasswordButton("Linda123");
    });

    it("A055 Show password When seller click “Eye” icon in new password and password again fileds", () => {
        loginPage
            .goToLoginPage()
            .clickForgotPasswordLink();
        forgotPasswordPage
            .inputEmailAddress(user.valid.email)
            .clickResetPasswordButton()
            .verifyPasswordResetSuccessPage();
        accessLinkFromEmail();
        resetPasswordPage
            .inputNewPassword("Linda@123")
            .clickShowNewPasswordButton("Linda@123")
            .inputConfirmNewPassword("Linda@123")
            .clickShowConfirmNewPasswordButton("Linda@123");
    });

    it("A056 Show log in page When seller click “Sign in” button in “Password reset success” page", () => {
        resetPasswordPage
            .inputNewPassword(user.valid.password)
            .inputConfirmNewPassword(user.valid.password)
            .clickConfirmButton()
            .clickSignInButton();
        loginPage.verifyInLoginPage();
    });

    it("A057 Login successfully When seller login with new password", () => {
        loginPage
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton()
            .verifyInHomePage();
    });

    it("A058 Shows messages When seller login with old password", () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, "Linda@123")
            .clickLoginButton()
            .verifyShowErrorMsg("Incorrect username or password");
    });

    //failed test case: “Password reset success” When seller click again “Reset your password” button in email
    it("A059 Shows messages When seller click again “Reset your password” button in email", () => {
        loginPage.goToLoginPage();
        accessLinkFromEmail();
        cy.wait(1500000);
        resetPasswordPage
            .inputNewPassword("Linda1234")
            .inputConfirmNewPassword("Linda1234")
            .clickConfirmButton();
        resetPasswordPage
            .verifyShowErrorMsg("Invalid reset password token or token has been expired");
    });
})