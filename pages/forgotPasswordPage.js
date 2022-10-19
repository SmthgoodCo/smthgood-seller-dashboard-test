export class ForgotPasswordPage {
    constructor() {
        this.forgotPasswordPageText = "Forgot your password? No worries";
        this.emailAddressInput = "#emailAddress";
        this.resetPasswordBtn = "RESET PASSWORD";
        this.errorMsg = ".error";
        this.checkYourInboxMsg = "Check your inbox";
        this.forgotPasswordSuccessMsg = "Instructions to reset your password have been sent to your email.";
        this.okBtn = "OK";
        this.backToLoginLink = "Back to login";
    }

    verifyInForgotPasswordPage() {
        cy.url().should('include', "/reset-password");
        cy.contains(this.forgotPasswordPageText).should('be.visible');
        return this;
    }

    inputEmailAddress(email = "") {
        cy.get(this.emailAddressInput).clear();
        if (email != "")
            cy.get(this.emailAddressInput).type(email);
        return this;
    }

    clickResetPasswordButton(isCheckEmail = false) {
        cy.get("button").contains(this.resetPasswordBtn).click();
        if(isCheckEmail)
            cy.wait(20000);
        return this;
    }

    verifyShowErrorMsg(msg) {
        cy.get(this.errorMsg).contains(msg).should("be.visible");
        return this;
    }

    verifyPasswordResetSuccessPage() {
        cy.contains(this.checkYourInboxMsg).should('be.visible');
        cy.contains(this.forgotPasswordSuccessMsg).should('be.visible');
        return this;
    }

    clickOKButton() {
        cy.get('button').contains(this.okBtn).click();
        return this;
    }

    clickBackToLoginLink() {
        cy.get('a').contains(this.backToLoginLink).click();
        return this;
    }

    verifyNotShowForgotPasswordPage() {
        cy.url().should('not.include', "/reset-password");
        cy.contains(this.forgotPasswordPageText).should('not.exist');
        return this;
    }
}