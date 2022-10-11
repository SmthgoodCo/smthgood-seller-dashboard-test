export class ResetPasswordPage {
    constructor() {
        this.emailAddressInput = "#emailAddress";
        this.resetPasswordBtn = "RESET PASSWORD";
        this.errorMsg = ".error";
        this.passwordResetSuccessPageText = "Your new password is confirmed!";
        this.passwordResetSuccessMsg = "You can use it to sign in right away.";
        this.signInBtn = "SIGN IN";
        this.resetPasswordPageText = "Reset your password";
        this.newPasswordInput = "#newPassword";
        this.confirmNewPasswordInput = "#confirmPassword";
        this.confirmBtn = "CONFIRM";
        this.showPassword = ".MuiIconButton-label";
    }

    inputEmailAddress(email = "") {
        cy.get(this.emailAddressInput).clear();
        if (email != "")
            cy.get(this.emailAddressInput).type(email);
        return this;
    }

    clickResetPasswordButton() {
        cy.get("button").contains(this.resetPasswordBtn).click();
        cy.wait(30000);
        return this;
    }

    verifyShowErrorMsg(msg) {
        cy.get(this.errorMsg).contains(msg).should("be.visible");
        return this;
    }

    clickSignInButton() {
        cy.contains(this.signInBtn).click();
        return this;
    }

    inputNewPassword(newPassword = "") {
        cy.get(this.newPasswordInput).clear();
        if (newPassword != "") cy.get(this.newPasswordInput).type(newPassword);
        return this;
    }

    inputConfirmNewPassword(confirmNewPassword = "") {
        cy.get(this.confirmNewPasswordInput).clear();
        if (confirmNewPassword != "") cy.get(this.confirmNewPasswordInput).type(confirmNewPassword);
        return this;
    }

    clickConfirmButton() {
        cy.get('button').contains(this.confirmBtn).click();
        return this;
    }

    verifyInResetPasswordPage() {
        cy.url().should('include', "/new-password");
        cy.contains(this.resetPasswordPageText).should('be.visible');
        return this;
    }

    verifyPasswordResetSuccessPage() {
        cy.wait(5000);
        cy.contains(this.passwordResetSuccessPageText).should('be.visible');
        cy.contains(this.passwordResetSuccessMsg).should('be.visible');
        return this;
    }

    clickShowPasswordButton(password = "", passwordLabel = "") {
        switch (passwordLabel) {
            case "newPassword":
                cy.get(this.showPassword).first().click();
                cy.get(this.newPasswordInput)
                    .should('have.value', password)
                    .invoke("attr", "type")
                    .then((type) => {
                        expect(type).equal("text");
                    });
                cy.get(this.showPassword).first().click();
                break;
            case "confirmPassword":
                cy.get(this.showPassword).last().click();
                cy.get(this.confirmNewPasswordInput)
                    .should('have.value', password)
                    .invoke("attr", "type")
                    .then((type) => {
                        expect(type).equal("text");
                    });
                cy.get(this.showPassword).last().click();
                break;
        }
        return this;
    }

    clickRestPasswordWithOldToken() {
        cy.visit("https://seller-smthgood.vinova.sg/new-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NDAiLCJqdGkiOiJlY2NlNDM4OC0yNGE3LTQyOTgtOGNiMS1kYjgwYWE3ZWU2YWIiLCJpYXQiOjE2NjU0NjU2NDgsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTbXRoR29vZFNlbGxlciIsIlNtdGhHb29kU2VsbGVyOkVtYWlsIjoiYXV0b21hdGlvbnNtdGdvb2RAZ21haWwuY29tIiwiU210aEdvb2RTZWxsZXI6VXNlcm5hbWUiOiJiYW90ZXN0c3RhZ2luZyIsIlNtdGhHb29kU2VsbGVyOklkIjoiOTQwIiwiU210aEdvb2RTZWxsZXI6VmVuZG9ySWQiOiIzNzciLCJuYmYiOjE2NjU0NjU2NDgsImV4cCI6MTY2NTQ2NjI0OCwiaXNzIjoiU210aEdvb2RTZWxsZXIiLCJhdWQiOiJTbXRoR29vZFNlbGxlciJ9.lztBRt6cY8b7KREPz9f51YVxGABSrGS40XHqVRx6L2k");
        return this;
    }
}