export class ResetPasswordPage {
    constructor() {
        this.resetPasswordPageText = "Forgot your password? No worries";
        this.emailAddressInput = "#emailAddress";
        this.resetPasswordBtn = "RESET PASSWORD";
        this.errorMsg = ".error";
        this.checkYourInboxMsg = "Check your inbox";
        this.resetPasswordSuccessMsg = "Instructions to reset your password have been sent to your email.";
        this.okBtn = "OK";
        this.backToLoginLink = "Back to login";
    }

    verifyInResetPasswordPage() {
        cy.url().should('include', "/reset-password");
        cy.contains(this.resetPasswordPageText).should('be.visible');
        return this;
    }

    inputEmailAddress(email = "") {
        cy.get(this.emailAddressInput).clear();
        if (email != "")
            cy.get(this.emailAddressInput).type(email);
        return this;
    }

    clickResetPasswordButton() {
        cy.get("button").contains(this.resetPasswordBtn).click();
        cy.wait(2000);
        return this;
    }

    verifyShowErrorMsg(msg) {
        cy.get(this.errorMsg).contains(msg).should("be.visible");
        return this;
    }

    verifyPasswordResetSuccessPage() {
        cy.contains(this.checkYourInboxMsg).should('be.visible');
        cy.contains(this.resetPasswordSuccessMsg).should('be.visible');
        return this;
    }

    clickOKButton() {
        cy.get('button').contains(this.okBtn).click();
        return this;
    }

    clickBackToLoginLink(){
        cy.get('a').contains(this.backToLoginLink).click();
    }

    verifyNotShowResetPasswordPage() {
        cy.url().should('not.include', "/reset-password");
        cy.contains(this.resetPasswordPageText).should('not.exist');
        return this;
    }
}