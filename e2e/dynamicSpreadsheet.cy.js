/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { ProductPage } = require("../pages/productPage");
const { DynamicSpreadsheetPage } = require("../pages/dynamicSpreadsheetPage");
import user from "../fixtures/userData.json";
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

    it('D_001 Show Upload Dynamic Spreadsheet popup When seller click “Dynamic Spreadsheet” button in product list page', () => {
        dynamicSpreadsheetPage.verifyShowUploadDynamicSpreadsheetPopup();
    })

    it('D_002 Upload Dynamic Spreadsheet popup closed When seller click “cancel” icon', () => {
        dynamicSpreadsheetPage
            .clickCancelButton()
            .verifyClosedUploadDynamicSpreadsheetPopup();
    })

    it('D_003 Window should be open to select the file When seller click “Browse Files” button', () => {
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile('./fixtures/files/image-1.jpg')
            .verifyBrowseFilesSelect();

    })

    it('D_004 window should be closed When seller click “Cancel” button', () => {
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile()
            .verifyChooseAnotherFileNotDisplayed();
    })

    it('D_005 When seller not upload file type, nothing happens', () => {
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile()
            .verifyChooseAnotherFileNotDisplayed();
    })

    it('D_006 When seller upload invalid file type is image file, nothing happen', () => {
        dynamicSpreadsheetPage
            .clickBrowseFilesButtonAndSelectFile('./fixtures/files/image-2.jpg')
            .verifyChooseAnotherFileNotDisplayed()
            .clickCancelButton();
    })
})