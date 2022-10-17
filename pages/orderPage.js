export class OrderPage {
    constructor() {
        this.orderEmptyText = 'You do not have any orders at the moment.';
    }

    verifyShowOrderEmptyText() {
        cy.contains(this.orderEmptyText).should('be.visible');
        return this;
    }
}