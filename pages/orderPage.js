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
        this.orderTableList = '.MuiTableBody-root >tr';
        this.orderTableCell = '.MuiTableCell-body';
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

        cy.contains(this.atAGlanceTitle).next().children('div').eq(0).children('p').invoke('text').then((orderReceived) => {
            if (orderReceived == 0) {
                cy.contains(this.atAGlanceTitle).next().children('div').eq(1).children('p').invoke('text').then((orderCancelled) => {
                    if (orderCancelled == 0) {
                        cy.contains(this.atAGlanceTitle).next().children('div').eq(2).children('p').invoke('text').then((orderCompleted) => {
                            if (orderCompleted == 0) {
                                cy.contains(this.atAGlanceTitle).next().children('div').eq(3).children('p').invoke('text').then((refund_Inprogress) => {
                                    if (refund_Inprogress == 0) {
                                        cy.contains(this.atAGlanceTitle).next().children('div').eq(4).children('p').invoke('text').then((itemSoldOut) => {
                                            if (itemSoldOut == 0) {
                                                cy.contains(this.atAGlanceTitle).next().children('div').eq(5).children('p').invoke('text').then((activeDiscount) => {
                                                    if (activeDiscount == 0) {
                                                        cy.get(this.orderPage).scrollIntoView();
                                                        cy.contains(this.orderEmptyText).should('be.visible');
                                                    } else {
                                                        cy.get(this.orderTableList).its('length').should('be.gt', 0)
                                                        cy.contains(this.orderEmptyText).should('not.exist');
                                                    }
                                                })
                                            } else {
                                                cy.get(this.orderTableList).its('length').should('be.gt', 0)
                                                cy.contains(this.orderEmptyText).should('not.exist');
                                            }
                                        })
                                    } else {
                                        cy.get(this.orderTableList).its('length').should('be.gt', 0)
                                        cy.contains(this.orderEmptyText).should('not.exist');
                                    }
                                })
                            } else {
                                cy.get(this.orderTableList).its('length').should('be.gt', 0)
                                cy.contains(this.orderEmptyText).should('not.exist');
                            }
                        })
                    } else {
                        cy.get(this.orderTableList).its('length').should('be.gt', 0)
                        cy.contains(this.orderEmptyText).should('not.exist');
                    }
                })
            } else {
                cy.get(this.orderTableList).its('length').should('be.gt', 0)
                cy.contains(this.orderEmptyText).should('not.exist');
            }

        });
        return this;
    }

    clickOrderTabButton(button) {
        cy.get(this.orderBtnList).contains(button).click();
        return this;
    }

    // verifyShowNumberAtAGrance(item) {
    //     cy.contains(this.atAGlanceTitle).next().children('div').eq(item).children('p').invoke('text').then((elmText) =>{
    //         if(elmText == 0){
    //             cy.contains(this.orderEmptyText).should('not.exist');
    //         } else {
    //             cy.get(this.orderTableList).its('length').then(($orderLength) => {
    //                 var lengthText = $orderLength.toString();
    //                 expect(elmText).to.equal(lengthText);
    //             })
    //         }
    //     })
    // }

    verifyShowNumberAtAGrance(item) {
        cy.wait(2000);
        cy.get(this.orderTableCell).its('length').then(($orderLength) => {
            if($orderLength == 1) {
                cy.get(this.orderTableList).children('td').children('p').invoke('text').then((elmText)=>{
                    if(elmText == this.orderEmptyText) {
                        cy.contains(this.atAGlanceTitle).next().children('div').eq(item).children('p').should('have.text', '0');
                    } 
                })
            } else {
                cy.contains(this.atAGlanceTitle).next().children('div').eq(item).children('p').invoke('text').then((elmText) =>{
                    cy.get(this.orderTableList).its('length').then(($orderLength) => {
                        var lengthText = $orderLength.toString();
                        expect(elmText).to.equal(lengthText);
                    })
                })
            }
        })

    }

    verifyShowNumberAtAGranceIs0() {
        cy.wait(2000);
        cy.get(this.orderTableList).children('td').children('p').invoke('text').then((elmText)=>{
            if(elmText == this.orderEmptyText) {
                cy.contains(this.atAGlanceTitle).next().children('div').eq(1).children('p').should('have.text', '0');
            } 
        })

    }
}