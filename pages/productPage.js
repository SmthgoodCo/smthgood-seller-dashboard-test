export class ProductPage {
    constructor() {
        this.emptyProductText = '.MuiGrid-root';
        this.addingYourInventoryTxt = 'ADDING YOUR INVENTORY ';
        this.integrateShopifyTxt = 'Integrate With Shopify';
        this.uploadDynamicSpreadsheetTxt = 'Upload Dynamic Spreadsheet';
        this.inputProductsManually = 'Input Products Manually';
        this.productTagButton = '.MuiToggleButtonGroup-root>button';
        this.proctTable = '.MuiTableBody-root>tr'
        this.searchProductListBtn = '.MuiTableRow-root .MuiInputBase-root>input'
        this.proceedToIntegrateLink = 'Proceed to integrate';
        this.proceedToUploadLink = 'Proceed to upload';
        this.buttonList = '.MuiGrid-item';
        this.integrateWithShopifyBtn = 'Integrate with Shopify';
        this.dynamicSpreadsheetBtn = 'Dynamic Spreadsheet';
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
        cy.url().should('include', 'product');
        cy.get("body").then($body => {
            if ($body.find('.MuiGrid-item').length > 0) {
                cy.get(this.productTagButton).then(($tagName) => {
                    expect($tagName.eq(1)).to.contain('Active')
                    expect($tagName.eq(2)).to.contain('Draft')
                    expect($tagName.eq(3)).to.contain('Archived')
                });
                cy.get(this.searchProductListBtn)
                    .invoke('attr', 'placeholder')
                    .should('eq', 'Search products');
                cy.get(this.proctTable).its('length').should('be.greaterThan', 0);
            } else {
                cy.contains('You do not have any product at the moment.')
                    .should('be.visible');
                cy.contains('Start adding products to sell!')
                    .should('be.visible');
            }
        })
    }
}