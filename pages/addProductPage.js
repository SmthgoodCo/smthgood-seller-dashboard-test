export class AddProductPage {
    constructor() {
        this.addProductStatusText = 'Products saved as Draft or Archived will not be viewable by buyers.';
        this.addMediaFileText = 'Add up to 20 images and 1 video (max file size: 1MB).';
        this.backIcon = 'img[alt="icBack"]';
        this.saveBtn = 'Save'
        this.titleInput = 'input[name="title"]';
        this.descriptionInput = 'textarea[name="description"]';
        this.statusSelect = '[aria-haspopup="listbox"]';
        this.addMediaFileBtn = '[id="file-upload"]';
        this.priceInput = '[name="price"]';
        this.skuInput = '[name="sku"]';
        this.barCodeInput = '[name="barCode"]';
        this.quantityInput = '[name="quantity"]';
        this.shippingWeightInput = '[name="shippingWeight"]';
        this.generateTagsBtn = 'Generate Tags';
        this.generateicTag = '[alt="icTagGenerate"]'; 
        this.generateTagsMsg = 'Please add Image to “Generate Tags”';
        this.additionalTagsInput = 'Additional Tags'; //parent()->input/button
        this.categorySelect = '[alt="icArrowDownNoactive"]';
        this.occasionsListCheckbox = '.MuiFormGroup-root';
        this.msgBarNotification = 'Create failed, please check again!';
        this.optionCheckbox = 'This product has various sizes and/or colours'; //prev
        this.sizeOptionsText = 'Size Options';
        this.colourMaterialOptionsText = 'Colour / Material Options';
        this.createdProductSuccessMsg = 'Created product successfully!';
    }

    verifyShowAddProductPage() {
        cy.url().should('include', '/products/add-product');
        cy.contains(this.addProductStatusText).should('be.visible');
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

    verifyShowMessageEmptyTitle() {
        cy.get('input[name="title"]').parents()
            .contains('Title is required').should('be.visible');
        return this;
    }

    verifyShowWarningMessage(contain, msgErr) {
        cy.contains(contain).parent().should('contain', msgErr)
        return this;
    }

    inputInforProduct(title, description, status, price, quantity, shippingWeight, addMediaFile, icTag, category, occasionsItem) {
        const path = './fixtures/files/' + addMediaFile;
        const occasionsList = ['Night out', 'Day out', 'Party', 'Formal', 'Active', 'Work', 'Vacation', 'Lounging', 'Special', 'Swimwear'];

        if (title != '') {
            cy.get(this.titleInput).clear().type(title);
        }

        if (description != '') {
            cy.get(this.descriptionInput).clear().type(description);
        }

        if (status != '') {
            cy.get(this.statusSelect).select(status);
        }

        if (price != '') {
            cy.get(this.priceInput).clear().type(price);
        }

        if (quantity != '') {
            cy.get(this.quantityInput).clear().type(quantity);
        }

        if (shippingWeight != '') {
            cy.get(this.shippingWeightInput).clear().type(shippingWeight);
        }

        if (addMediaFile != '') {
            cy.get(this.addMediaFileBtn).selectFile(path, { force: true });
        }

        if (icTag != '') {
            cy.get('button').contains(this.generateTagsBtn).click()
            cy.contains(this.additionalTagsInput).parent().find('input').clear({force: true}).type(icTag);
            cy.contains(this.additionalTagsInput).parents().find('button').contains('Add', {timeout: 5000}).click();
        }

        if(category != '') {
            cy.get(this.categorySelect).click();
            cy.get('[alt="icArrowRight"]').prev().contains(category).click()
            cy.contains('Dresses').click();
        }

        if(occasionsItem != ''){
            cy.get(this.occasionsListCheckbox).find('label').within(() =>{
                cy.contains(occasionsList[occasionsItem]).prev().find('[type="checkbox"]').check();
            })
        }

        return this;
    }

    verifyShowMessageBarNotification() {
        cy.contains(this.msgBarNotification).should('be.visible')

        return this;
    }

    clickOptionCheckbox(isCheck) {
        switch (isCheck) {
            case true:
                cy.contains(this.optionCheckbox).prev().find('[type="checkbox"]').check();
                cy.contains(this.sizeOptionsText).should('be.visible');
                cy.contains(this.colourMaterialOptionsText).should('be.visible')
                break;
            case false:
                cy.contains(this.optionCheckbox).prev().find('[type="checkbox"]').uncheck();
                cy.contains(this.sizeOptionsText).should('not.be.visible')
                cy.contains(this.colourMaterialOptionsText).should('not.be.visible')
                break;
        }
        return this;
    }

    verifyShowMessageBarCreatedProductSuccess() {
        cy.contains(this.createdProductSuccessMsg).should('be.visible');
        return this;
    }

}