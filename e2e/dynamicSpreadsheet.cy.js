/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { ProductPage } = require("../pages/productPage");
const { DynamicSpreadsheetPage } = require("../pages/dynamicSpreadsheetPage");
import user from "../fixtures/userData.json";
import fileName from "../fixtures/fileNames.json";
let email = user.valid.email;
let password = user.valid.password;
const loginPage = new LoginPage();
const homePage = new HomePage();
const productPage = new ProductPage();
const dynamicSpreadsheetPage = new DynamicSpreadsheetPage();

describe('Shopify with Integration Functionality', () => {
    before(() => {
        loginPage
            .goToLoginPage()
            .loginWithUser(user.valid.email, user.valid.password)
            .clickLoginButton();
        homePage.clickProductsOnMenu();
        productPage.clickDynamicSpreadsheetButton();
    })

    it('D_001 When seller click “Dynamic Spreadsheet” button in product list page, show Upload Dynamic Spreadsheet popup', () => {
        dynamicSpreadsheetPage.verifyShowUploadDynamicSpreadsheetPopup();
    })

    it('D_002 When seller click “cancel” icon, Upload Dynamic Spreadsheet popup closed', () => {
        dynamicSpreadsheetPage
            .clickCancelButton()
            .verifyClosedUploadDynamicSpreadsheetPopup();
    })

    it('D_003 When seller click “Browse Files” button, window should be open to select the file', () => {
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .verifyBrowseFilesHaveAttributesUpload()
            .clickBrowseFilesButtonAndSelectFile(fileName.valid.template)
            .clickCancelButton();
    })

    it('D_004 When seller click “Cancel” button, window should be closed', () => {
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile()
            .verifyUploadNothingHappen();
    })

    it('D_005 When seller not upload file type, nothing happens', () => {
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile()
            .verifyUploadNothingHappen();
    })

    it('D_006 When seller upload invalid file type is image file, nothing happen', () => {
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile(fileName.valid.image)
            .verifyUploadNothingHappen();
    })

    it('D_007 When seller upload invalid file type is document file, nothing happen', () => {
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile(fileName.valid.document)
            .verifyUploadNothingHappen();
    })

    it('D_008 When seller upload invalid file type is audio file, nothing happen', () => {
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile(fileName.valid.audio)
            .verifyUploadNothingHappen();
    })

    it('D_009 When seller upload invalid file type is video file, nothing happen', () => {
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile(fileName.valid.video)
            .verifyUploadNothingHappen();
    })

    it('D_010 When seller upload valid file type is CSV file, show Upload Completed popup', () => {
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile(fileName.valid.template1)
            .verifyChooseFileSuccess(fileName.valid.template1)
            .clickUploadButton()
            .verifyShowUploadingPopup()
            .verifyShowUploadCompletedSuccess();
    })
})