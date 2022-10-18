export class OrderPage {
    constructor() {
        this.orderEmptyText = 'You do not have any orders at the moment.';
        this.orderTracking = '.MuiGrid-root .jss53';
        this.orderPage = '.MuiGrid-root .jss52'
        this.orderReceived = 'ORDERS RECEIVED';
    }

    verifyShowOrderEmptyText() {
        cy.get(this.orderPage).scrollIntoView();
        cy.contains(this.orderEmptyText).should('be.visible');
        return this;
    }

    verifyOrderReceivedEmpty() {
        cy.get(this.orderTracking)
        .contains(this.orderReceived)
        .prev('p').should('have.text', '0');
        cy.get(this.orderPage).scrollIntoView();
        cy.contains(this.orderEmptyText).should('be.visible'); 
        return this;
    }
}