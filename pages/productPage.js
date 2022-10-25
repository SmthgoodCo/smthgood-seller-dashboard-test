export class ProductPage {
    constructor() {
        this.emptyProductText = '.MuiGrid-root';
        this.addingYourInventoryTxt = 'ADDING YOUR INVENTORY ';
        this.integrateShopifyTxt = 'Integrate With Shopify';
        this.integrateShopifyPopupText = 'To integrate your smthgood and Shopify inventories, simply follow the steps below.';
        this.uploadDynamicSpreadsheetTxt = 'Upload Dynamic Spreadsheet';
        this.inputProductsManually = 'Input Products Manually';
        this.integrateWithShopifyBtn = 'Integrate with Shopify';
        this.productTagButton = '.MuiToggleButtonGroup-root>button';
        this.proctTable = '.MuiTableBody-root>tr'
    }

    verifyEmptyProductMessages() {
        cy.contains('You do not have any product at the moment.')
            .should('be.visible');
        cy.contains('Start adding products to sell!')
            .should('be.visible');
        return this;
    }

    verifyShowProductPage(){
        cy.url().should('include', 'products');
        cy.contains(this.addingYourInventoryTxt, { matchCase: false }).should('be.visible');
        cy.contains(this.integrateShopifyTxt).should('be.visible');
        cy.contains(this.uploadDynamicSpreadsheetTxt).should('be.visible');
        cy.contains(this.inputProductsManually).should('be.visible');
        return this;
    }

    clickIntegrateWithShopifyButton() {
        cy.wait(2000);
        cy.get('button>span').contains(this.integrateWithShopifyBtn).click();
        return this;
    }

    verifyShowlistProduct() {
        cy.get(this.productTagButton).then(($tagName) => {
            expect($tagName.eq(1)).to.contain('Active')
            expect($tagName.eq(2)).to.contain('Draft')
            expect($tagName.eq(3)).to.contain('Archived')
        });
        cy.get(this.proctTable).its('length').should('be.greaterThan', 0);
    }
}