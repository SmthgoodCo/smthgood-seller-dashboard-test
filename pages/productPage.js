export class ProductPage {
    constructor() {
        this.emptyProductText = '.MuiGrid-root';
        this.addingYourInventoryTxt = 'ADDING YOUR INVENTORY ';
        this.integrateShopifyTxt = 'Integrate With Shopify';
        this.uploadDynamicSpreadsheetTxt = 'Upload Dynamic Spreadsheet';
        this.inputProductsManually = 'Input Products Manually';
        this.productTagButton = '.MuiToggleButtonGroup-root>button';
        this.proctTable = '.MuiTableBody-root>tr'
        this.searchProductInPut = '[placeholder="Search products"]'
        this.searchProductListBtn = '.MuiTableRow-root .MuiInputBase-root>input'
        this.proceedToIntegrateLink = 'Proceed to integrate';
        this.proceedToUploadLink = 'Proceed to upload';
        this.buttonList = '.MuiGrid-item';
        this.integrateWithShopifyBtn = 'Integrate with Shopify';
        this.dynamicSpreadsheetBtn = 'Dynamic Spreadsheet';
        this.addProductBtn = 'Add Product';
        this.productEmptyText = 'You do not have any product at the moment.';
        this.deletePopupConfirm = '[role="dialog"]  button';
        this.deleteBtn = 'Delete';
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
                cy.get(this.proctTable).its('length').should('be.greaterThan', 0);
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
        cy.get(this.proctTable,{ timeout: 10000 }).within(() => {
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
        cy.get("body",{ timeout: 10000 }).then($body => {
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
        cy.get(this.proctTable,{ timeout: 10000 }).within(() => {
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
        cy.get(this.proctTable,{ timeout: 10000 }).within(() => {
            cy.get('td').eq(6).find('button').last().click({ force: true });
        })
        cy.get(this.deletePopupConfirm).contains(this.deleteBtn).click({ force: true });
        cy.contains('Deleted completed!').should('be.visible');
        cy.wait(2000);
        return this;
    }

    verifyDeleteProductSuccess(productName) {
        cy.wait(5000)
        cy.get("body",{ timeout: 10000 }).then($body => {
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
}