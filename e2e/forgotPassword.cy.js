/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { ForgotPasswordPage } = require("../pages/forgotPasswordPage");
import user from "../fixtures/userData.json";
import {
  getRandomEmail,
  getRandomNumber,
  getRandomText,
} from "../support/functionCommon";

const loginPage = new LoginPage();
const forgotPasswordPage = new ForgotPasswordPage();

describe("Forgot Password Functionality", () => {
  beforeEach(() => {
    loginPage.goToLoginPage();
  });

  it("C001 Display forgot password page when seller click “Forgot password”", () => {
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage.verifyInForgotPasswordPage();
  });

  it("C002 Display forgot password page when seller after 5 attempts wrong email", () => {
    let randomEmail = getRandomEmail();
    loginPage.clickLoginButtonIn5Attempts(randomEmail, user.valid.password);
    forgotPasswordPage.verifyInForgotPasswordPage();
  });

  it("C003 Display forgot password page when seller after 5 attempts wrong password", () => {
    let randomPassword = getRandomText();
    loginPage.clickLoginButtonIn5Attempts(user.valid.email, randomPassword);
    forgotPasswordPage.verifyInForgotPasswordPage();
  });

  it("C004 Display forgot password page when seller after 5 attempts wrong email and password", () => {
    let randomEmail = getRandomEmail();
    let randomPassword = getRandomText();
    loginPage.clickLoginButtonIn5Attempts(randomEmail, randomPassword);
    forgotPasswordPage.verifyInForgotPasswordPage();
  });

  it("C005 Shows validation messages when seller leave email field", () => {
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .inputEmailAddress()
      .clickResetPasswordButton()
      .verifyShowErrorMsg("Email cannot be empty");
  });

  it("C006 Shows validation messages when seller enter space email filed", () => {
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .inputEmailAddress("  ")
      .clickResetPasswordButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("C007 Shows validation messages when seller enter text email filed", () => {
    let randomText = getRandomText();
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .inputEmailAddress(randomText)
      .clickResetPasswordButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("C008 Shows validation messages when seller enter number email filed", () => {
    let randomNumber = getRandomNumber();
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .inputEmailAddress(randomNumber)
      .clickResetPasswordButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("C009 Shows validation messages when seller enter special character email filed", () => {
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .inputEmailAddress("%^%#$%")
      .clickResetPasswordButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("C010 Shows validation messages when seller enter email that does not exist", () => {
    let randomEmail = getRandomEmail();
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .inputEmailAddress(randomEmail)
      .clickResetPasswordButton()
      .verifyShowErrorMsg("Email address not found");
  });

  it("C011 Display “Password reset success” page when seller enter valid email filed", () => {
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .inputEmailAddress(user.valid.email)
      .clickResetPasswordButton()
      .verifyPasswordResetSuccessPage();
  });

  it("C012 Show login page when seller click “OK!” button", () => {
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .inputEmailAddress(user.valid.email)
      .clickResetPasswordButton()
      .verifyPasswordResetSuccessPage()
      .clickOKButton();
    loginPage.verifyInLoginPage();
  });

  it("A026 Not show forgot password page When seller after 5 attempts invalid email", () => {
    loginPage
      .loginWithUser("linda", "Linda@123")
      .clickLoginButton()
      .loginWithUser("12345", "Linda@123")
      .clickLoginButton()
      .loginWithUser("   ", "Linda@123")
      .clickLoginButton()
      .loginWithUser("#%$", "Linda@123")
      .clickLoginButton()
      .loginWithUser("linda12# ", "Linda@123")
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
    forgotPasswordPage.verifyNotShowForgotPasswordPage();
  });

  it("A027 Not show forgot password page When seller after 5 attempts invalid email", () => {
    loginPage
      .loginWithUser("linda+5@vinova.com.sg", "1234")
      .clickLoginButton()
      .loginWithUser("linda+5@vinova.com.sg", "2341")
      .clickLoginButton()
      .loginWithUser("linda+5@vinova.com.sg", "3412")
      .clickLoginButton()
      .loginWithUser("linda+5@vinova.com.sg", "4123")
      .clickLoginButton()
      .loginWithUser("linda+5@vinova.com.sg", "12345")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
    forgotPasswordPage.verifyNotShowForgotPasswordPage();
  });

  it("A028 Not show forgot password page When seller after 5 attempts invalid email and password", () => {
    loginPage
      .loginWithUser("linda", "1234")
      .clickLoginButton()
      .loginWithUser("12345", "2341")
      .clickLoginButton()
      .loginWithUser("    ", "3412")
      .clickLoginButton()
      .loginWithUser("!@#$%", "4123")
      .clickLoginButton()
      .loginWithUser("linda12#$ ", "12345")
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid")
      .verifyShowErrorMsg("Password must be at least 8 characters");
    forgotPasswordPage.verifyNotShowForgotPasswordPage();
  });

  it("A029 Shows validation messages When seller leave email filed", () => {
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .clickResetPasswordButton()
      .verifyShowErrorMsg("Email cannot be empty");
  });

  it("A035 Back to login page When seller click “Back to login” tab", () => {
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .clickBackToLoginLink();
    loginPage.verifyInLoginPage();
  });

  it("A038 Back to login page When seller click “Back to login” tab in “Password reset success” page", () => {
    loginPage.clickForgotPasswordLink();
    forgotPasswordPage
      .verifyInForgotPasswordPage()
      .inputEmailAddress(user.valid.email)
      .clickResetPasswordButton()
      .verifyPasswordResetSuccessPage()
      .clickBackToLoginLink();
    loginPage.verifyInLoginPage();
  });
});
