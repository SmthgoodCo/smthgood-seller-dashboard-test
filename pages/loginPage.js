export class LoginPage {
  constructor() {
    this.usernameInput = "#username";
    this.passwordInput = "#password";
    this.signInBtn = "SIGN IN";
    this.errorMsg = ".error";
    this.blankEmailErrMsg = "Email cannot be empty";
    this.blankEmailErrMsg = "Password cannot be empty";
    this.showPassword = ".MuiIconButton-label";
    this.homePageText = "AT A GLANCE";
    this.forgotPasswordLink = "Forgot password?";
    this.loginPageMsg = "Welcome back!";
  } 

  goToLoginPage() {
    cy.clearCookies();
    cy.visit(Cypress.env("login_url"));
    return this;
  }

  loginWithUser(email = "", password = "") {
    cy.get(this.usernameInput).clear();
    if (email != "") cy.get(this.usernameInput).type(email);

    cy.get(this.passwordInput).clear();
    if (password != "") cy.get(this.passwordInput).type(password);
    return this;
  }

  clickLoginButton() {
    cy.get("button").contains(this.signInBtn).click();
    cy.wait(2000);
    return this;
  }

  verifyShowErrorMsg(msg) {
    cy.get(this.errorMsg).contains(msg).should("be.visible");
    return this;
  }

  clickShowPasswordButton() {
    cy.get(this.showPassword).click();
    return this;
  }

  verifyPasswordIsShow() {
    cy.get(this.passwordInput)
      .invoke("attr", "type")
      .then((type) => {
        expect(type).equal("text");
      });
    return this;
  }
  
  verifyInHomePage() {
    cy.wait(5000);
    cy.get("p").contains(this.homePageText).should("be.visible");
    return this;
  }

  clickForgotPasswordLink() {
    cy.contains(this.forgotPasswordLink).click();
    return this;
  }

  clickLoginButtonIn5Attempts(email= "", password= "") {
    for(var i = 0; i < 5; i++) {
      this.loginWithUser(email, password);
      this.clickLoginButton();
    }
    return this;
  }

  verifyInLoginPage() {
    cy.url().should('include', '/login');
    cy.contains(this.loginPageMsg).should('be.visible');
    return this;
  }
}
