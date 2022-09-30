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
  }

  goToLoginPage() {
    cy.clearCookies();
    cy.visit(Cypress.env("login_url"));
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
    cy.intercept(
      "GET",
      "/api/services/seller/products/get-template-csv-link"
    ).as("getTemplateLink");
    cy.wait("@getTemplateLink").wait(2000);
    cy.get("p").contains(this.homePageText).should("be.visible");
    return this;
  }
}
