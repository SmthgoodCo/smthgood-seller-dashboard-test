export class ShopifyIntegrationPopupPage {
    constructor() {
        this.integratingTitle = 'Integrating';
        this.integratingText = 'This may take a while, please do not close or refresh this page in the meantime.';
        this.integrationErrorTitle = 'Integration Error';
        this.integrationPopup = '[role="presentation"]>.MuiGrid-root';
        this.integrationPopupOkBtn = 'Ok';
        this.integrationCompletedTitle = 'Integration Completed';
        this.closeIconBtn = 'img[alt="cloce"]';
    }

    verifyShowIntegrationPopup(integrationMsg = '', isCheckCompleted = false) {
        cy.contains(this.integratingTitle).should('be.visible');
        cy.contains(this.integratingText).should('be.visible');
        cy.wait(20000);
        switch (isCheckCompleted) {
            case false:
                cy.get(this.integrationPopup)
                    .contains(this.integrationErrorTitle)
                    .should('be.visible');
                cy.get(this.integrationPopup)
                    .contains(integrationMsg)
                    .should('be.visible');
                break;
            case true:
                cy.get(this.integrationPopup)
                    .contains(this.integrationCompletedTitle)
                    .should('be.visible');
                cy.get(this.integrationPopup)
                    .contains('Integration summary')
                    .should('be.visible');
                break;
        }
        return this;
    }

    clickOkButon() {
        cy.get(this.integrationPopup)
            .contains(this.integrationPopupOkBtn)
            .click();
        return this;
    }

    clickCloseIconButton() {
        cy.wait(2000);
        cy.contains(this.integratingTitle).should('be.visible');
        cy.contains(this.integratingText).should('be.visible');
        cy.get(this.closeIconBtn).click();
        return this;
    }

    verifyShowStopPopupConfirm(){
        cy.contains('Stop the integration?').should('be.visible');
    }
}