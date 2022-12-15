export class ProductPage {
    constructor() {
        this.emptyProductText = '.MuiGrid-root';
        this.addingYourInventoryTxt = 'ADDING YOUR INVENTORY ';
        this.integrateShopifyTxt = 'Integrate With Shopify';
        this.uploadDynamicSpreadsheetTxt = 'Upload Dynamic Spreadsheet';
        this.inputProductsManually = 'Input Products Manually';
        this.productTagButton = '.MuiToggleButtonGroup-root>button';
        this.productTable = '.MuiTableBody-root>tr';
        this.productTableCell = '.MuiTableCell-body';
        this.searchProductInPut = '[placeholder="Search products"]';
        this.searchProductListBtn = '.MuiTableRow-root .MuiInputBase-root>input';
        this.proceedToIntegrateLink = 'Proceed to integrate';
        this.proceedToUploadLink = 'Proceed to upload';
        this.buttonList = '.MuiGrid-item';
        this.integrateWithShopifyBtn = 'Integrate with Shopify';
        this.dynamicSpreadsheetBtn = 'Dynamic Spreadsheet';
        this.addProductBtn = 'Add Product';
        this.productEmptyText = 'You do not have any product at the moment.';
        this.popupConfirmBtn = '[role="dialog"]  button';
        this.deleteBtn = 'Delete';
        this.tableHead = '.MuiTableHead-root';
        this.moreActionsBtn = 'More Actions';
        this.moreActionsList = '[name="actions"]'; //pre('div')
        this.applyBtn = 'Apply';
        this.cancelBtn = 'Cancel';
        this.removeBtn = 'Remove';
        this.msgChangeStatusComplate = 'Change Status completed!';
        this.msgDuplicateComplate = 'Duplicate completed!';
        this.msgDeletedComplate = 'Deleted completed!';
        this.msgAddCollectionComplate = 'Add Collection completed!';
        this.msgRemoveCollectionComplate = 'Remove Collection completed!';
        this.popupChecbox = '.MuiDialog-paperScrollPaper input';
    }

    verifyEmptyProductMessages() {
        cy.contains('You do not have any product at the moment.')
            .should('be.visible');
        cy.contains('Start adding products to sell!')
            .should('be.visible');
        return this;
    }

    verifyShowProductPage() {
        cy.url().should('include', 'products');
        cy.contains(this.addingYourInventoryTxt, { matchCase: false }).should('be.visible');
        cy.contains(this.integrateShopifyTxt).should('be.visible');
        cy.contains(this.uploadDynamicSpreadsheetTxt).should('be.visible');
        cy.contains(this.inputProductsManually).should('be.visible');
        return this;
    }

    clickIntegrateWithShopifyButton() {
        cy.wait(5000);
        cy.get('p.MuiTypography-root').contains('Products').scrollIntoView();
        cy.get("body").then($body => {
            if ($body.find(this.buttonList).length > 0) {
                cy.get(this.buttonList).contains(this.integrateWithShopifyBtn).click();
            } else {
                cy.get('p').contains(this.proceedToIntegrateLink).click();
            }
        })
        return this;
    }

    clickDynamicSpreadsheetButton() {
        cy.wait(5000);
        cy.get("body").then($body => {
            if ($body.find(this.buttonList).length > 0) {
                cy.get(this.buttonList).contains(this.dynamicSpreadsheetBtn).click();
            } else {
                cy.get('p').contains(this.proceedToUploadLink).click();
            }
        })
        return this;
    }

    verifyShowlistProduct() {
        // cy.intercept('https://api-smthgood.vinova.sg/api/services/seller/categories', (req) => {
        cy.url().should('include', 'product');
        cy.wait(5000);
        cy.get("body").then($body => {
            if ($body.find(this.searchProductListBtn).length > 0) {
                cy.get(this.searchProductInPut)
                    .invoke('attr', 'placeholder')
                    .should('eq', 'Search products');
                cy.get(this.productTable).its('length').should('be.greaterThan', 0);
            }
            else {
                cy.contains('You do not have any product at the moment.')
                    .should('be.visible');
                cy.contains('Start adding products to sell!')
                    .should('be.visible');
            }
        })
        return this;
    }

    verifyProductAfterUploadCSVFileSuccess(productName) {
        cy.get(this.searchProductInPut).type(productName);
        cy.wait(5000)
        cy.get(this.productTable, { timeout: 10000 }).within(() => {
            cy.get('td').eq(1).should('have.text', 'Dynamic Spreadsheet Product 2');
            cy.get('td').eq(1).find('img').invoke('attr', 'src')
                .should('include', '/product_variants/Template/pexels-neosiam-603022.jpg');
            cy.get('td').eq(2).should('have.text', '2 in stockfor 2 variants');
            cy.get('td').eq(3).should('have.text', 'Draft');
        })
        return this;
    }

    clickAddProductButton() {
        cy.wait(5000);
        cy.get("body", { timeout: 10000 }).then($body => {
            if ($body.find(this.searchProductListBtn).length > 0) {
                cy.get(this.buttonList).contains(this.addProductBtn).click();
            } else {
                cy.get('p').contains('Proceed to input').click();
            }
        })
        return this;
    }

    verifyProductAddSuccess(productName, quantity, status, category) {
        cy.get(this.searchProductInPut).clear().type(productName);
        cy.wait(2000);
        cy.get(this.productTable, { timeout: 10000 }).within(() => {
            cy.get('td').eq(1).should('have.text', productName);
            cy.get('td').eq(2).should('have.text', quantity + ' in stock');
            if (status == '') {
                cy.get('td').eq(3).should('have.text', 'Draft');
            } else {
                cy.get('td').eq(3).should('have.text', status);
            }
            cy.get('td').eq(4).should('have.text', category);
        })

        return this;
    }

    clickDeleteProduct(productName) {
        cy.get(this.searchProductInPut).clear().type(productName);
        cy.get(this.productTable, { timeout: 10000 }).within(() => {
            cy.get('td').eq(6).find('button').last().click({ force: true });
        })
        this.clickPopupButton(this.deleteBtn);
        cy.contains(this.msgDeletedComplate).should('be.visible');
        return this;
    }

    verifyDeleteProductSuccess(productName) {
        cy.wait(5000)
        cy.get("body", { timeout: 10000 }).then($body => {
            if ($body.find(this.searchProductListBtn).length > 0) {
                cy.get(this.searchProductInPut).clear().type(productName);
                cy.contains(this.productEmptyText).should('be.visible');
                cy.contains(productName).should('not.exist');
            }
            else {
                cy.contains('You do not have any product at the moment.')
                    .should('be.visible');
                cy.contains('Start adding products to sell!')
                    .should('be.visible');
            }
        })
        return this;
    }

    searchProduct(productName) {
        if (productName != '') {
            cy.get(this.searchProductInPut).clear();
            cy.get(this.searchProductInPut).type(productName);
        }
        cy.wait(2000);
        return this;
    }

    clickCheckboxProduct(isCheck) {
        if (isCheck == true) {
            cy.get(this.tableHead).contains('More Actions').should('not.exist');
            cy.get(this.productTable, { timeout: 10000 }).within(() => {
                cy.get('td').eq(0).find('input').check();
            })
            cy.get(this.tableHead).contains('More Actions').should('be.visible');
        } else {
            cy.get(this.tableHead).contains('More Actions').should('be.visible');
            cy.get(this.productTable, { timeout: 10000 }).within(() => {
                cy.get('td').eq(0).find('input').uncheck();
            })
            cy.get(this.tableHead).contains('More Actions').should('not.exist');
        }
        return this;
    }

    clickMoreActionsButton() {
        cy.get(this.tableHead).contains('More Actions').click();
        return this;
    }

    verifyShowMoreActionsList() {
        cy.get('[name="actions"]').prev('div').within(() => {
            cy.contains('Set as active').should('be.visible');
            cy.contains('Set as draft').should('be.visible');
            cy.contains('Archive products').should('be.visible');
            cy.contains('Duplicate products').should('be.visible');
            cy.contains('Delete products').should('be.visible');
            cy.contains('Add to collection(s)').should('be.visible');
            cy.contains('Remove from collection(s)').should('be.visible');
            cy.contains('Export CSV').should('be.visible');
        })
        return this;
    }

    selectActions(action, confirm) {
        cy.get('[name="actions"]').prev('div').within(() => {
            cy.contains(action).click();
        })

        switch (confirm) {
            case true:
                cy.contains('Apply changes to the items?').should('be.visible');
                cy.get('button').contains(this.applyBtn).click();
                break;
            case false:
                cy.contains('Apply changes to the items?').should('be.visible');
                cy.get('button').contains(this.applyBtn).click();
                break;
        }
        return this;
    }

    verifyShowMessage(msg) {
        cy.contains(msg, { timeout: 5000 }).should('be.visible');
        return this;
    }

    verifyShowDeletePopupConfirm(isShow) {
        if (isShow == true) {
            cy.contains('Delete selected products?').should('be.visible');
            cy.contains('Do you want to delete the selected products?').should('be.visible');
        } else {
            cy.contains('Delete selected products?').should('not.exist');
            cy.contains('Do you want to delete the selected products?').should('not.exist');
        }
        return this;
    }

    clickPopupButton(button) {
        cy.wait(1000);
        cy.get(this.popupConfirmBtn).contains(button).click({force: true});
        return this;
    }

    addProductCollection() {
        cy.contains('Add 1 products to collections').should('be.visible');
        cy.get(this.popupChecbox).check();
        return this;
    }

    clickCheckboxCollectionPopup(statusCollectionSelect) {
        switch (statusCollectionSelect) {
            case 'add':
                cy.contains('Add 1 products to collections').should('be.visible');
                cy.get(this.popupChecbox).check();
                break;
            case 'remove':
                cy.contains('Remove 1 products to collections').should('be.visible');
                cy.get(this.popupChecbox).check();
                break;
        }
        return this;
    }

    verifyProductAddRemoveCollectionSuccess(collectionName, statusCollectionSelect) {
        cy.get(this.productTable, { timeout: 10000 }).within(() => {
            switch (statusCollectionSelect) {
                case 'add':
                    cy.get('td').eq(5).should('have.text', collectionName);
                    break;
                case 'remove':
                    cy.get('td').eq(5).should('not.have.text', collectionName);
                    break;
            }
        })
        return this;
    }
}