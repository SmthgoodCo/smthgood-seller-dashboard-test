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
        this.categoryTitle = 'Category';
        this.occasionsListCheckbox = '.MuiFormGroup-root';
        this.msgBarNotification = 'Create failed, please check again!';
        this.optionCheckbox = 'This product has various sizes and/or colours'; //prev
        this.sizeOptionsText = 'Size Options';
        this.colourMaterialOptionsText = 'Colour / Material Options';
        this.plusIcon = 'img[alt="plus"]';
        this.optionValue = 'Option Values';
        this.addOptionValueInput = 'input[placeholder="Add option value"]';
        this.removeBtn = 'Remove';
        this.cancelBtn = 'Cancel';
        this.createdProductSuccessMsg = 'Created product successfully!';
        this.statusListValue = '.MuiPopover-paper [role="listbox"]';
        this.draftStatus = 'Draft';
        this.activeStatus = 'Active';
        this.archivedStatus = 'Archived';
        this.clickHereText = 'click here.';
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
        cy.get('button[type="submit"]').eq(1).click();
        return this;
    }

    verifyShowWarningMessage(contain, msgErr) {
        cy.contains(contain).scrollIntoView().parent().should('contain', msgErr)
        return this;
    }

    inputInforProduct(title, description, status, price, quantity, shippingWeight, addMediaFile, category, occasionsItem) {
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

        if (category != '') {
            cy.get(this.categorySelect).click();
            cy.get('[alt="icArrowRight"]').prev().contains(category).click();
            cy.contains('Dresses').click();
        }

        if (occasionsItem != '') {
            cy.get(this.occasionsListCheckbox).find('label').within(() => {
                cy.contains(occasionsList[occasionsItem]).prev().find('[type="checkbox"]').check();
            })
        }

        return this;
    }

    clickAddTagButton() {
        cy.get('button').contains(this.generateTagsBtn).click();
        cy.contains('Do check the tags for accuracy.').next('div').children('div', { timeout: 15000 }).then(($div) => {
            cy.get($div).eq(0).click();
            cy.get($div).eq(1).click();
        })
        return this;
    }

    inputTag(tag, isSave = false){
        cy.get('button').contains('Generate Tags').click()
        cy.contains('Additional Tags').next('div').children().children('input').type(tag)
        if(isSave == true){
            cy.get('button').contains("Add", {timeout: 5000}).click();
        }
        return this;
    }

    verifyShowMessageBarNotification(isShow = true) {
        if (isShow == true) {
            cy.contains(this.msgBarNotification).should('be.visible')
        } else {
            cy.contains(this.msgBarNotification).should('not.exist');
        }

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

    clickPlusIcon(option) {
        cy.contains(option).parent().next().find(this.plusIcon).click();
        cy.get(this.addOptionValueInput)
            .should('have.attr', 'placeholder', 'Add option value');
        cy.contains(option).parent().next().children('button').eq(1).should('be.disabled');
        cy.contains(this.optionValue).parent().children('button').should('be.disabled');

        return this;
    }

    inputAddOptionValue(option, eq, value) {
        cy.get(this.addOptionValueInput).eq(eq).clear().type(value);
        cy.get(this.addOptionValueInput).eq(eq).parents('span').prev().children('span').children('input')
            .invoke('val').should('eq', value);
        cy.contains(option).parent().next().children('button').eq(1).should('not.be.disabled');
        cy.contains(this.optionValue).parent().children('button').contains('Done').should('not.be.disabled');
        return this;
    }

    clickDeleteOption(option) {
        cy.contains(option).parent().next().children('button').eq(1).click();
        return this;
    }

    verifyShowDeletePopup(isShow) {
        switch (isShow) {
            case true:
                cy.contains('Delete Size Options?').should('be.visible');
                cy.contains('Remove size options from this product listing? This action cannot be undone.').should('be.visible');
                break;
            case false:
                cy.contains('Delete Size Options?').should('not.exist');
                cy.contains('Remove size options from this product listing? This action cannot be undone.').should('not.exist');
                break;
        }
        return this;
    }

    clickButton(button) {
        cy.get('button').contains(button).click();
        return this;
    }

    verifyRemoveOptionSuccess(eq) {
        cy.get(this.addOptionValueInput).eq(eq).parents('span').prev().children('span').children('input')
            .invoke('val').should('be.empty');
        return this;
    }

    clickStatusListBox() {
        cy.get(this.statusSelect).click();
        cy.get(this.statusListValue).should('exist');
        cy.get(this.statusListValue).should('contain', 'Draft');
        cy.get(this.statusListValue).should('contain', 'Active');
        cy.get(this.statusListValue).should('contain', 'Archived');
        return this;
    }

    selectStatusValue(statusValue) {
        cy.get(this.statusSelect).click();
        switch (statusValue) {
            case 'Draft':
                cy.get(this.statusListValue).contains('Draft').click();
                break;
            case 'Active':
                cy.get(this.statusListValue).contains('Active').click();
                break;
            case 'Archived':
                cy.get(this.statusListValue).contains('Archived').click();
                break;
        }
        cy.get(this.statusSelect).should('have.text', statusValue);
        cy.get(this.statusSelect).contains(statusValue).should('be.visible');

        return this;
    }

    clickHereLink() {
        cy.window().then(win => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url;
            })
        })

        cy.contains(this.clickHereText).click();
        cy.url().should("include", 'smthgoodco.com/value');
        cy.get('button').contains('Accept Cookies').click();
        cy.contains('Sustainability and Ethical Values', { timeout: 5000 }).should('be.visible');

        return this;
    }

    clickCategory() {
        cy.get(this.categorySelect).click();
        return this;
    }

    verifyShowListCategory() {
        cy.contains(this.categoryTitle).parent().children('div').eq(1).within(($list) => {
            cy.get($list).scrollIntoView();
            cy.get($list).contains('Accessories').should('be.visible');
            cy.get($list).contains('Bags').should('be.visible');
            cy.get($list).contains('Clothing').should('be.visible');
            cy.get($list).contains('Footwear').should('be.visible');
            cy.get($list).contains('Jewellery').scrollIntoView().should('be.visible');
            cy.get($list).contains('Intimate Wear').should('be.visible');
        })
        return this;
    }

    clickSubCategory(category = 'Accessories') {
        cy.contains(this.categoryTitle).parent().children('div').eq(1).within(($list) => {
            cy.get($list).scrollIntoView();
            cy.get($list).contains(category).click();
            cy.get($list).contains(category).parent().nextUntil()
                .should('contain', 'Bag Straps')
                .should('contain', 'Belts')
                .should('contain', 'Gloves')
                .should('contain', 'Hats and Caps')
                .should('contain', 'Scarves')
                .should('contain', 'Suspenders');
        })
        return this;
    }

    clickOccasionsCheckbox(occasions, isCheck) {
        switch (isCheck) {
            case true:
                cy.get(this.occasionsListCheckbox).find('label').within(() => {
                    cy.contains(occasions).children().eq(0).should('not.have.class', 'Mui-checked');
                    cy.contains(occasions).find('[type="checkbox"]').check();
                    cy.contains(occasions).children().eq(0).should('have.class', 'Mui-checked');
                })
                
                break;
            case false:
                cy.get(this.occasionsListCheckbox).find('label').within(() => {
                    cy.contains(occasions).children().eq(0).should('not.have.class', 'Mui-checked');
                    cy.contains(occasions).find('[type="checkbox"]').check();
                    cy.contains(occasions).children().eq(0).should('have.class', 'Mui-checked');
                    cy.contains(occasions).find('[type="checkbox"]').uncheck();
                    cy.contains(occasions).children().eq(0).should('not.have.class', 'Mui-checked');

                })
                break;
        }
        return this;
    }

}