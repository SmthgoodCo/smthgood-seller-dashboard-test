export class OrderPage {
    constructor() {
        this.orderEmptyText = 'You do not have any orders at the moment.';
        this.orderTracking = '.MuiGrid-root .jss53';
        this.orderPage = '.MuiGrid-root .jss52'
        this.orderReceivedTitle = 'ORDERS RECEIVED';
        this.atAGlanceTitle = 'AT A GLANCE';
        this.orderBtnList = '[role="group"]';
        this.allBtn = 'All';
        this.orderReceived = 'Order Received';
        this.shipped = 'Shipped';
        this.completed = 'Completed';
        this.cancelled = 'Cancelled';
        this.refunded = 'Refunded';
        this.orderTableList = '.MuiTableBody-root >tr';
        this.orderTableCell = '.MuiTableCell-body';
        this.orderStatus = 'div[aria-haspopup="listbox"]';
        this.sortBtn = 'Sort';
        this.sortListBtn = '[aria-labelledby="basic-button"]';
        this.newestfirstBtn = 'Newest first';
        this.oldestfirstBtn = 'Oldest first';
        this.highestamount = 'Highest amount';
        this.lowestamount = 'Lowest amount';
        this.noneBtn = 'None'; //next()
        this.filterBtn = 'Filter';
    }

    verifyShowOrderEmptyText() {
        cy.get(this.orderPage).scrollIntoView();
        cy.contains(this.orderEmptyText).should('be.visible');
        return this;
    }

    verifyOrderReceivedEmpty() {
        cy.get(this.orderTracking)
            .contains(this.orderReceivedTitle)
            .prev('p').should('have.text', '0');
        cy.get(this.orderPage).scrollIntoView();
        cy.contains(this.orderEmptyText).should('be.visible');
        return this;
    }

    getValueAtAGlance(item) {
        cy.contains(this.atAGlanceTitle).next().children('div').eq(item).children('p').invoke('text').then((orderReceived) => { });
    }

    verifyShowListOrder() {

        var orderReceived = this.getValueAtAGlance(0);
        var orderCancelled = this.getValueAtAGlance(1);
        var orderCompleted = this.getValueAtAGlance(2);
        var refund_Inprogress = this.getValueAtAGlance(3);
        var itemSoldOut = this.getValueAtAGlance(4);
        var activeDiscount = this.getValueAtAGlance(5);

        if (orderReceived == 0 && orderCancelled == 0
            && orderCompleted == 0 && refund_Inprogress == 0
            && itemSoldOut == 0 && activeDiscount == 0) {
            cy.get(this.orderPage).scrollIntoView();
            cy.contains(this.orderEmptyText).should('be.visible');
        } else {
            cy.get(this.orderTableList).its('length').should('be.gt', 0)
            cy.contains(this.orderEmptyText).should('not.exist');
        }
        return this;
    }

    clickOrderTabButton(button) {
        cy.get(this.orderBtnList).contains(button).click();
        return this;
    }

    verifyShowNumberAtAGlance(item) {
        cy.wait(2000);
        cy.get(this.orderTableCell).its('length').then(($orderLength) => {
            if ($orderLength == 1) {
                cy.get(this.orderTableList).children('td').children('p').invoke('text').then((elmText) => {
                    if (elmText == this.orderEmptyText) {
                        cy.contains(this.atAGlanceTitle).next().children('div').eq(item).children('p').should('have.text', '0');
                    }
                })
            } else {
                cy.contains(this.atAGlanceTitle).next().children('div').eq(item).children('p').invoke('text').then((elmText) => {
                    cy.get(this.orderTableList).its('length').then(($orderLength) => {
                        var lengthText = $orderLength.toString();
                        expect(elmText).to.equal(lengthText);
                    })
                })
            }
        })

    }

    verifyOrderInOrderTable(item, status) {
        cy.wait(2000);
        cy.get(this.orderTableCell).its('length').then(($orderLength) => {
            if ($orderLength == 1) {
                cy.get(this.orderTableList).contains(this.orderEmptyText).should('be.visible');
                cy.contains(this.atAGlanceTitle).next().children('div').eq(item).children('p').should('have.text', '0');
            } else {
                cy.get(this.orderTableCell).find(this.orderStatus).first().invoke('text').then(($elmText) => {
                    expect($elmText).to.equal(status);
                    cy.contains(this.atAGlanceTitle).next().children('div').eq(item).children('p').invoke('text').then((elmText) => {
                        cy.get(this.orderTableList).its('length').then(($orderLength) => {
                            var lengthText = $orderLength.toString();
                            expect(elmText).to.equal(lengthText);
                        })
                    })
                })
            }
        })
        console.log('countOrderNumberWithStatus', +this.countOrderNumberWithStatus(status));
    }

    verifyOrderShippingInOrderTable() {
        cy.wait(2000);
        cy.get(this.orderTableCell).its('length').then(($orderLength) => {
            if ($orderLength == 1) {
                cy.get(this.orderTableList).contains(this.orderEmptyText).should('be.visible');
            } else {
                cy.get(this.orderTableCell).find(this.orderStatus).first().invoke('text').then(($elmText) => {
                    if ($elmText == 'Shipped') {
                        cy.get(this.orderTableList).its('length').should('be.greaterThan', 0);
                        cy.get(this.orderTableCell).find(this.orderStatus).should('contain', 'Shipped');
                        cy.get(this.orderTableList).contains(this.orderEmptyText).should('not.exist');
                    }
                })
            }
        })
    }

    countOrderNumberWithStatus(status) {
        cy.get(this.orderTableCell)
            .find(this.orderStatus)
            .contains(status)
            .its('length')
            .then(($orderLength) => {
            })
    }

    clickButtonOrerPage(button) {
        cy.get('button').contains(button).click()
        return this;
    }

    clickSortOptionButton(button) {
        cy.get(this.sortListBtn).contains(button).click();
        cy.wait(2000);
        return this;
    }

    verifyShowListSortButton(isClick = 'Visible') {
        switch (isClick) {
            case 'Visible':
                cy.get(this.sortListBtn).contains(this.newestfirstBtn).should('be.visible');
                cy.get(this.sortListBtn).contains(this.oldestfirstBtn).should('be.visible');
                cy.get(this.sortListBtn).contains(this.highestamount).should('be.visible');
                cy.get(this.sortListBtn).contains(this.lowestamount).should('be.visible');
                cy.get(this.sortListBtn).contains(this.noneBtn).should('be.visible');
                break;

            case 'Exit':
                cy.contains(this.newestfirstBtn).should('not.exist');
                cy.contains(this.oldestfirstBtn).should('not.exist');
                cy.contains(this.highestamount).should('not.exist');
                cy.contains(this.lowestamount).should('not.exist');
                break;
        }

        return this;
    }

    verifyShowSortOrder(col, sort, sliceIndex) {
        cy.get(this.orderTableList).its('length').then(($length) => {
            let firstUserPrices = []
            let arrPrices = []
            for (var i = 0; i < $length; i++) {
                cy.get(this.orderTableList).eq(i).children('td').eq(col).invoke('text').then(($value) => {
                    firstUserPrices.push(parseInt($value.slice(sliceIndex)));
                    arrPrices.push(parseFloat($value.slice(sliceIndex)));
                    for (var j = 0; j < firstUserPrices.length - 1; j++) {
                        switch (sort) {
                            case 'Newest first':
                                expect(firstUserPrices[j]).to.be.greaterThan(firstUserPrices[j + 1])
                                break;
                            case 'Oldest first':
                                expect(firstUserPrices[j]).to.be.lessThan(firstUserPrices[j + 1])
                                break;
                            case 'Highest amount':
                                if (arrPrices[j] == arrPrices[j + 1]) {
                                    expect(arrPrices[j]).to.be.equal(arrPrices[j + 1])
                                }
                                expect(arrPrices[j]).to.be.greaterThan(arrPrices[j + 1])
                                break;
                            case 'Lowest amount':
                                if (arrPrices[j] == arrPrices[j + 1]) {
                                    expect(arrPrices[j]).to.be.equal(arrPrices[j + 1])
                                }
                                expect(arrPrices[j]).to.be.lessThan(arrPrices[j + 1])
                                break;
                            case 'None':
                                expect(firstUserPrices[j]).to.be.greaterThan(firstUserPrices[j + 1])
                                break;
                        }
                    }
                })
                firstUserPrices = [];
                arrPrices = [];
            }
        });
        return this;
    }

    clickOutside() {
        cy.get('body').click(0, 400);
        return this;
    }
}