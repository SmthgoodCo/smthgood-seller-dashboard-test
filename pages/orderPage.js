export class OrderPage {
    constructor() {
        this.orderEmptyText = 'You do not have any orders at the moment.';
        this.orderTracking = '.MuiGrid-root .jss53';
        this.orderPage = '.MuiGrid-root .jss52'
        this.orderReceived = 'ORDERS RECEIVED';
        this.atAGlanceTitle = 'AT A GLANCE';
        this.orderBtnList = '[role="group"]';
        this.allBtn = 'All';
        this.orderReceivedBtn = 'Order Received';
        this.shippedBtn = 'Shipped';
        this.completedBtn = 'Completed';
        this.cancelledBtn = 'Cancelled';
        this.refundedBtn = 'Refunded';
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

    verifyShowListOrder() {
        cy.contains(this.atAGlanceTitle).next().find('div').eq(3).find('p').then((elmText) => {
            if (elmText.text() != '0') {
                cy.get(this.orderBtnList).contains('Order Received').click();
            } else {
                cy.get(this.orderBtnList).contains('Order Received').click();
                cy.contains(this.orderEmptyText).should('be.visible');
            }
        })
        return this;
    }
}