export class DynamicSpreadsheetPage {
    constructor() {
        this.uploadDynamicSpreadsheetTitle = 'If you have a large inventory, it may be easier to upload a CSV file.';
        this.uploadDynamicSpreadsheetText = 'Don’t have an existing CSV file?Downloadthe smthgood CSV template now.';
        this.browseFilesBtn = '.MuiBadge-root';
        this.chooseFile = 'input[type="file"]';
        this.chooseAnotherFileBtn = 'Choose Another File';
        this.drapAndDropBox = 'label[for="file"]';
        this.fileName = 'img[alt="IcBlankCavas"]'; //next('p') or parrent()
        this.uploadBtn = 'Upload';
        this.cancelBtn = 'Cancel';
        this.uploadingTitle = 'Uploading';
        this.uploadCompletedTitle = 'Upload Completed';
        this.uploadCompletedText = 'Dynamic spreadsheet upload summary';
        this.okBtn = 'Ok';
        this.download = 'a[download]';
        this.checkbox = 'input[type="checkbox"]';
        this.textAfterCheckbox = 'Overwrite any existing products';
        this.dynamicSpreadsheetPageTitle = 'Dynamic Spreadsheet Upload';
        this.openLink;
    }

    verifyShowUploadDynamicSpreadsheetPopup() {
        cy.contains(this.uploadDynamicSpreadsheetTitle).should('be.visible');
        cy.contains(this.uploadDynamicSpreadsheetText).should('be.visible');
        return this;
    }

    verifyClosedUploadDynamicSpreadsheetPopup() {
        cy.contains(this.uploadDynamicSpreadsheetTitle).should('not.exist');
        cy.contains(this.uploadDynamicSpreadsheetText).should('not.exist');
        return this;
    }

    clickCancelButton() {
        cy.contains(this.cancelBtn).click();
        return this;
    }


    clickUploadButton() {
        cy.get('button').contains(this.uploadBtn).click();
        return this;
    }

    clickChooseFilesButtonAndSelectFile(file = '', buttonChooseFile) {
        const path = './fixtures/files/' + file;
        switch (buttonChooseFile) {
            case 'browseFile':
                cy.get(this.browseFilesBtn).click({ force: true });
                break;
            case 'anotherFile':
                cy.contains(this.chooseAnotherFileBtn).click({ force: true });
                break;
        }
        if (file != '') {
            cy.get('input[type="file"]').first().selectFile(path, { force: true })
        }
        return this;
    }

    verifyUploadNothingHappen() {
        cy.contains(this.chooseAnotherFileBtn).should('not.exist');
        cy.get('button').contains(this.uploadBtn).should('be.disabled');
        return this;
    }

    verifyBrowseFilesHaveAttributesUpload() {
        cy.get(this.chooseFile)
            .should('have.attr', 'accept', '.csv')
            .should('have.attr', 'type', 'file');
        return this;
    }

    verifyChooseFileSuccess(filename) {
        cy.get(this.fileName).next('p').contains(filename).should('be.visible');
        cy.contains(this.chooseAnotherFileBtn).should('be.visible');
        cy.get('button').contains(this.uploadBtn).should('not.be.disabled');
        return this;
    }

    verifyShowUploadingPopup() {
        cy.contains(this.uploadingTitle).should('be.visible');
        return this;
    }

    verifyShowUploadCompletedSuccess() {
        cy.contains(this.uploadCompletedTitle).should('be.visible');
        cy.contains(this.uploadCompletedText).should('be.visible');
        cy.contains(this.okBtn).click();
        return this;
    }

    clickDownloadFileTemplate() {
        cy.task('deleteDownloads');
        cy.get(this.download).click({ force: true });
        cy.readFile('cypress/downloads/productVariants-Template.csv')
            .should('contain', 'Product Key,Product Name,Description,Price,Weight (Kg),Status,Tags,Colors,Sizes,Image Src,Image Position,Variant Key,Variant Name,Variant Image,Variant Size,Variant Colour,Variant Price,Variant Quantity,Variant Sku,Variant BarCode');
        cy.task('deleteDownloads');
        return this;
    }

    clickCheckbox(ischeck = false) {
        switch (ischeck) {
            case true:
                cy.contains(this.textAfterCheckbox).prev().find(this.checkbox).check({ force: true });
                cy.contains(this.textAfterCheckbox).prev().should('have.class', 'Mui-checked');
                cy.contains(this.textAfterCheckbox).prev().find('img').invoke('attr', 'src').should('include', 'ic-checkbox-active');
                break;
            case false:
                cy.contains(this.textAfterCheckbox).prev().find(this.checkbox).uncheck({ force: true });
                cy.contains(this.textAfterCheckbox).prev().should('not.have.class', 'Mui-checked');
                cy.contains(this.textAfterCheckbox).prev().find('img').invoke('attr', 'src').should('include', 'ic-checkbox');
                break;
        }
        return this;
    }

    clickOpenLink(linkOpen) {
        switch (linkOpen) {
            case 'hereLink':
                this.openLink = ' click here.';
                break;
            case 'shopee':
                this.openLink = 'How to get CSV file from Shopee';
                break;
            case 'lazada':
                this.openLink = 'How to get CSV file from Lazada';
                break;
            case 'tokopedia':
                this.openLink = 'How to get CSV file from Tokopedia';
                break;
            case 'wooCommerce':
                this.openLink = 'How to get CSV file from Woo Commerce';
                break;
            case 'bigCommerce':
                this.openLink = 'How to get CSV file from Big Commerce';
                break;
        }

        cy.get('a').contains(this.openLink)
            .invoke('removeAttr', 'target')
            .click();
        return this;
    }

    verifyShowDynamicSpreadsheetUploadPage() {
        cy.url().should('include', 'dynamic-spreadsheet-upload');
        cy.contains(this.dynamicSpreadsheetPageTitle, {timeout: 5000}).should('be.visible');
        return this;
    }

    verifyShowOpenLinkGetCSVFile(linkOpen) {
        cy.wait(7000);
        switch (linkOpen) {
            case 'shopee':
                cy.url().should('include', 'shopee')
                    .and('include', 'about-mass-upload');
                cy.contains('What is Mass Upload?', {timeout: 5000}).should('be.visible');
                break;
            case 'lazada':
                cy.url().should('include', 'lazada');
                cy.contains('Open your Lazada', {timeout: 5000}).should('be.visible');
                break;
            case 'tokopedia':
                cy.url().should('include', 'tokopedia')
                    .and('include', 'upload-kategori-sekaligus');
                cy.contains('Produk Sekaligus dengan Kategori', {timeout: 5000}).should('be.visible');
                break;
            case 'wooCommerce':
                cy.url().should('include', 'woocommerce')
                    .and('include', 'product-csv-import-suite-column-header-reference');
                cy.contains('Column Header Reference', {timeout: 5000}).should('be.visible');
                break;
            case 'bigCommerce':
                cy.url().should('include', 'bigcommerce')
                    .and('include', 'any-sample-csv-for-bulk-upload-of-products-with-product-options-and-rules');
                break;
        }
        return this;
    }

}