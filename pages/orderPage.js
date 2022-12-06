import { convertDate } from "../support/functionCommon";

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
        this.filterListBtn = '[role="menu"] .MuiList-root';
        this.dateInput = '[placeholder="00-00-0000"]';
        this.dayOfMonth = '.MuiPickersModal-dialog [tabindex="0"]';
        this.dayOfWeek = '.MuiPickersCalendarHeader-daysHeader';
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
        cy.get(this.orderBtnList).contains(button).click({ force: true });
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
        cy.get(this.sortListBtn, { timeout: 5000 }).contains(button).click();
        return this;
    }

    verifyShowListSortButton(isClick = true) {
        switch (isClick) {
            case true:
                cy.get(this.sortListBtn).contains(this.newestfirstBtn).should('be.visible');
                cy.get(this.sortListBtn).contains(this.oldestfirstBtn).should('be.visible');
                cy.get(this.sortListBtn).contains(this.highestamount).should('be.visible');
                cy.get(this.sortListBtn).contains(this.lowestamount).should('be.visible');
                cy.get(this.sortListBtn).contains(this.noneBtn).should('be.visible');
                break;

            case false:
                cy.contains(this.newestfirstBtn).should('not.exist');
                cy.contains(this.oldestfirstBtn).should('not.exist');
                cy.contains(this.highestamount).should('not.exist');
                cy.contains(this.lowestamount).should('not.exist');
                break;
        }

        return this;
    }

    verifyShowSortOrder(col, sort, sliceIndex) {
        cy.wait(2000);
        cy.get(this.orderTableList).its('length').then(($length) => {
            let arrOrderNo = []
            let arrPrices = []
            for (var i = 0; i < $length; i++) {
                cy.get(this.orderTableList).eq(i).children('td').eq(col).invoke('text').then(($value) => {
                    arrOrderNo.push(parseInt($value.slice(sliceIndex)));
                    arrPrices.push(parseFloat($value.slice(sliceIndex)));
                    for (var j = 0; j < arrOrderNo.length - 1; j++) {
                        switch (sort) {
                            case 'Newest first':
                                expect(arrOrderNo[j]).to.be.greaterThan(arrOrderNo[j + 1])
                                break;
                            case 'Oldest first':
                                expect(arrOrderNo[j]).to.be.lessThan(arrOrderNo[j + 1])
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
                                expect(arrOrderNo[j]).to.be.greaterThan(arrOrderNo[j + 1])
                                break;
                        }
                    }
                })
                arrOrderNo = [];
                arrPrices = [];
            }
        });
        return this;
    }

    clickOutside() {
        cy.get('body').click(0, 400);
        return this;
    }

    verifyShowListFilterButton(isClick = true) {
        switch (isClick) {
            case true:
                cy.get(this.filterListBtn).contains(this.orderReceived).should('be.visible');
                cy.get(this.filterListBtn).contains(this.shipped).should('be.visible');
                cy.get(this.filterListBtn).contains(this.completed).should('be.visible');
                cy.get(this.filterListBtn).contains(this.cancelled).should('be.visible');
                cy.get(this.filterListBtn).contains(this.refunded).should('be.visible');
                cy.get(this.filterListBtn).contains("Date").should('be.visible');
                cy.get(this.filterListBtn).find(this.dateInput).should('be.visible');
                cy.get(this.filterListBtn).contains(this.noneBtn).should('be.visible');
                break;

            case false:
                cy.get(this.filterListBtn).should('not.exist');
                cy.get(this.dateInput).should('not.exist');
                break;
        }

        return this;
    }

    clickFilterListButton(button) {
        cy.get(this.filterListBtn).contains(button).click();
        return this;
    }

    inputDateFilter(selectDate, date, today) {
        switch (selectDate) {
            case 'from':
                cy.get(this.dateInput).eq(0).type(date, { force: true });
                break;
            case 'to':
                cy.get(this.dateInput).eq(1).next().children('button').click({ force: true });
                cy.get(this.dayOfMonth).contains(today).click({ force: true });
                cy.get('button').contains('OK').click();
                break;
        }
        return this;
    }

    verifyShowOrderWithDateFilter(formValue, toValue) {
        cy.wait(2000);
        cy.get(this.orderTableCell).its('length').then(($orderLength) => {
            if ($orderLength == 1) {
                cy.get(this.orderTableList).contains(this.orderEmptyText).should('be.visible');
            } else {
                cy.get(this.orderTableList).its('length').then(($length) => {
                    if ($length == 1) {
                        cy.get(this.orderTableList).children('td').eq(2).invoke('text').then(($value) => {
                            expect($value.slice(0, 10)).to.be.equal(formValue);
                        })
                    } else {
                        if (toValue != '') {
                            cy.get(this.orderTableList).first().children('td').eq(2).invoke('text').then(($value) => {
                                expect($value.slice(0, 10)).to.be.equal(toValue);
                            })
                            cy.get(this.orderTableList).last().children('td').eq(2).invoke('text').then(($value) => {
                                expect($value.slice(0, 10)).to.be.equal(formValue);
                            })
                        } else {
                            cy.get(this.orderTableList).last().children('td').eq(2).invoke('text').then(($value) => {
                                expect($value.slice(0, 10)).to.be.equal(formValue);
                            })
                        }
                    }
                })
            }
        })
    }

    clickCalendarIcon(eq) {
        cy.get(this.dateInput).eq(eq).next().children('button').click({ force: true });
        return this;
    }

    verifyshowCalendarPicker() {
        cy.get(this.dayOfWeek)
            .should('contain', 'Su')
            .should('contain', 'Mo')
            .should('contain', 'Tu')
            .should('contain', 'We')
            .should('contain', 'Th')
            .should('contain', 'Fr')
            .should('contain', 'Sa');
        cy.get(this.dayOfMonth)
            .should('contain', '10')
            .should('contain', '11')
            .should('contain', '12')
            .should('contain', '13')
            .should('contain', '14')
            .should('contain', '15')
            .should('contain', '16');
    }
}