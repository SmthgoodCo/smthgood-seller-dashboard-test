export class DynamicSpreadsheetPage {
    constructor() {
        this.uploadDynamicSpreadsheetTitle = 'If you have a large inventory, it may be easier to upload a CSV file.';
        this.uploadDynamicSpreadsheetText = 'Don’t have an existing CSV file?Downloadthe smthgood CSV template now.';
        this.browseFilesBtn = '.MuiBadge-root';
        this.chooseAnotherFileBtn = 'Choose Another File';
        this.drapAndDropBox = 'label[for="file"]';
        this.fileName = 'img[alt="IcBlankCavas"]'; //next('p') or parrent()
        this.uploadBtn = 'Upload';
        this.cancelBtn = 'Cancel';
        this.inputFile = '.MuiBadge-root>input';
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

    clickBrowseFilesButtonAndSelectFile(path = '') {
        cy.get(this.browseFilesBtn).click({force: true});
        if (path != '') {
            cy.get('input[type="file"]').first().selectFile(path, {force: true})
        }
        return this;
    }

    verifyChooseAnotherFileNotDisplayed() {
        cy.contains(this.chooseAnotherFileBtn).should('not.exist');
        return this;
    }

    verifyBrowseFilesSelect() {
        cy.get(this.inputFile).invoke('attr', 'type')
        .should('eq', 'file');
    }
}