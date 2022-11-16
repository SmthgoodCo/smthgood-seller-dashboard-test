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

    clickBrowseFilesButtonAndSelectFile(file = '') {
        const path = './fixtures/files/'+file;
        cy.get(this.browseFilesBtn).click({force: true});
        if (file != '') {
            cy.get('input[type="file"]').first().selectFile(path, {force: true})
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
        .should('have.attr','type', 'file');
        return this;
    }

    verifyChooseFileSuccess(filename){
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
}