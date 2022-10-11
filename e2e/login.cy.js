/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
import user from "../fixtures/userData.json";

const loginPage = new LoginPage();
describe("Login Functionality", () => {
  beforeEach(function () {
    loginPage.goToLoginPage();
  });

  it("Redirects to login if not logged in", () => {
    cy.contains("Sign in to access your store account now.");
    cy.url().should("include", Cypress.env("login_url"));
  });

  it("A_002 go to homepage When seller enter valid all filed", () => {
    loginPage
      .loginWithUser(user.valid.email, user.valid.password)
      .clickLoginButton()
      .verifyInHomePage();
  });

  it("A_003 Shows messages When seller leave email field blank", () => {
    loginPage
      .loginWithUser("", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email cannot be empty");
  });

  it("A_004 Shows messages When seller enter space email filed", () => {
    loginPage
      .loginWithUser(" ", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("A_005 Shows messages When seller enter text email filed", () => {
    loginPage
      .loginWithUser("testing", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("A_006 Shows messages When seller enter number email filed", () => {
    loginPage
      .loginWithUser(122, user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("A_007 Shows messages When seller enter special character email filed", () => {
    loginPage
      .loginWithUser("@$#@$", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("A_008 Shows messages When seller leave password field blank", () => {
    loginPage
      .loginWithUser(user.valid.email, "")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("A_009 Shows messages When seller enter space password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "     ")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("A_010 Shows messages When seller enter under 8 characters in password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "     ")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });
  
  it("A_011 Login successfully When seller enter 8 characters and correct in password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "     ")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("A_012 Show message When seller enter 8 characters and incorrect in password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "     ")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("A_013 Login successfully When seller enter least 8 characters and incorrect in password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "     ")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("A_014 Shows messages When seller enter wrong email (No exist)", () => {
    loginPage
      .loginWithUser(user.valid.email + "a", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Incorrect username or password");
  });

  it("A_015 Shows messages When seller enter least 8 characters and correct in password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "         ")
      .clickLoginButton()
      .verifyShowErrorMsg("Incorrect username or password");
  });

  it("A_016 Shows messages When seller enter wrong email and password", () => {
    loginPage
      .loginWithUser(user.valid.email + "a", user.valid.password + "1")
      .clickLoginButton()
      .verifyShowErrorMsg("Incorrect username or password");
  });

  it("A_017 Shows messages When seller leave email and password fields blank", () => {
    loginPage
      .clickLoginButton()
      .verifyShowErrorMsg("Email cannot be empty")
      .verifyShowErrorMsg("Password cannot be empty");
  });

  it("A_018 Shows messages When seller invalid email and wrong password (least 8 character)", () => {
    loginPage
      .loginWithUser("abc", "abc1234567")
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("A_019 Shows messages When seller invalid email and wrong password (under 8 character)", () => {
    loginPage
      .loginWithUser("abc", "abc123")
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid")
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it('A_020 Display password When seller click "Eye"', () => {
    loginPage
      .loginWithUser(user.valid.email, user.valid.password)
      .clickShowPasswordButton()
      .verifyPasswordIsShow()
  });

  it("A_021 Show messages When seller enter wrong password", () => {
    loginPage
      .loginWithUser(user.valid.email, user.valid.password + "1")
      .clickLoginButton()
      .verifyShowErrorMsg("Incorrect username or password");
  });
});
