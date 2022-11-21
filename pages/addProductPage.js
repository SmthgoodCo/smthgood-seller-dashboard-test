export class AddProductPage {
    constructor() {
        this.addProductTitle = 'Add Product';
        this.addMediaFileText = 'Add up to 20 images and 1 video (max file size: 1MB).';
        this.backIcon = 'img[alt="icBack"]';
        this.saveBtn = 'Save'
    }

    verifyShowAddProductPage() {
        cy.url().should('include', '/products/add-product');
        cy.contains(this.addProductTitle).should('be.visible');
        cy.contains(this.addMediaFileText).should('be.visible');
        return this;
    }

    clickBackIcon() {
        cy.get(this.backIcon).click();
         return this;
    }

    clickSaveButton() {
        cy.get('button').contains(this.saveBtn).eq(0).click();
        return this;
    }

    verifyShowMessageEmptyTitle(){
        cy.get('input[name="title"]').parents()
        .contains('Title is required').should('be.visible');
        return this;
    }
}