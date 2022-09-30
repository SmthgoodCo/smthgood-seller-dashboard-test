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

  it.only("B001 go home page when email and password are valid", () => {
    loginPage
      .loginWithUser(user.valid.email, user.valid.password)
      .clickLoginButton()
      .verifyInHomePage();
  });

  it("B002 Shows validation messages when email is blank", () => {
    loginPage
      .loginWithUser("", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email cannot be empty");
  });

  it("B003 Shows validation messages When seller enter space email filed", () => {
    loginPage
      .loginWithUser(" ", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("B004 Shows validation messages When seller enter text email filed", () => {
    loginPage
      .loginWithUser("testing", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("B005 Shows validation messages When seller enter number email filed", () => {
    loginPage
      .loginWithUser(122, user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("B006 Shows validation messages when When seller enter special character email filed", () => {
    loginPage
      .loginWithUser("@$#@$", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("B007 Shows validation messages When seller leave password field blank", () => {
    loginPage
      .loginWithUser(user.valid.email, "")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("B008 Shows validation messages When seller enter space password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "     ")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("B009 Shows validation messages When seller enter space < 8 password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "     ")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("B009 Shows validation messages When seller enter space >= 8 password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "         ")
      .clickLoginButton()
      .verifyShowErrorMsg("Incorrect username or password");
  });

  it("B010 Shows validation messages When seller enter character < 8 password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "abc123")
      .clickLoginButton()
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("B011 Shows validation messages When seller enter character >= 8 password filed", () => {
    loginPage
      .loginWithUser(user.valid.email, "abcd12345")
      .clickLoginButton()
      .verifyShowErrorMsg("Incorrect username or password");
  });

  it("B012 Shows validation messagesWhen seller enter wrong email", () => {
    loginPage
      .loginWithUser(user.valid.email + "a", user.valid.password)
      .clickLoginButton()
      .verifyShowErrorMsg("Incorrect username or password");
  });

  it("B013 Shows validation messagesWhen seller enter wrong password", () => {
    loginPage
      .loginWithUser(user.valid.email, user.valid.password + "1")
      .clickLoginButton()
      .verifyShowErrorMsg("Incorrect username or password");
  });

  it("B014 Shows validation messages When seller enter wrong email and password", () => {
    loginPage
      .loginWithUser(user.valid.email + "a", user.valid.password + "1")
      .clickLoginButton()
      .verifyShowErrorMsg("Incorrect username or password");
  });

  it("B015 Shows validation messages When seller leave email and password fields blank", () => {
    loginPage
      .loginWithUser("", "")
      .clickLoginButton()
      .verifyShowErrorMsg("Email cannot be empty")
      .verifyShowErrorMsg("Password cannot be empty");
  });

  it("B016 Shows validation messages When seller invalid email and wrong password (under 8 character)", () => {
    loginPage
      .loginWithUser("abc", "abc123")
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid")
      .verifyShowErrorMsg("Password must be at least 8 characters");
  });

  it("B017 Shows validation messages When seller invalid email and wrong password (least 8 character)", () => {
    loginPage
      .loginWithUser("abc", "abc1234567")
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });

  it("B018 Shows validation messages When seller click Eye", () => {
    loginPage
      .loginWithUser("abc", "abc1234567")
      .clickShowPasswordButton()
      .verifyPasswordIsShow()
      .clickLoginButton()
      .verifyShowErrorMsg("Email invalid");
  });
});
