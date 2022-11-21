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

describe('Dynamic Spreadsheet Upload Functionality', () => {
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
            .clickChooseFilesButtonAndSelectFile(fileName.valid.template, 'browseFile')
            .clickCancelButton();
    })

    it('D_004 When seller click “Cancel” button, window should be closed', () => {
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile('', 'browseFile')
            .verifyUploadNothingHappen();
    })

    it('D_005 When seller not upload file type, nothing happens', () => {
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile('', 'browseFile')
            .verifyUploadNothingHappen();
    })

    it('D_006 When seller upload invalid file type is image file, nothing happen', () => {
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile(fileName.valid.image, 'browseFile')
            .verifyUploadNothingHappen();
    })

    it('D_007 When seller upload invalid file type is document file, nothing happen', () => {
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile(fileName.valid.document, 'browseFile')
            .verifyUploadNothingHappen();
    })

    it('D_008 When seller upload invalid file type is audio file, nothing happen', () => {
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile(fileName.valid.audio, 'browseFile')
            .verifyUploadNothingHappen();
    })

    it('D_009 When seller upload invalid file type is video file, nothing happen', () => {
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile(fileName.valid.video, 'browseFile')
            .verifyUploadNothingHappen();
    })

    it('D_010 When seller upload valid file type is CSV file, show Upload Completed popup', () => {
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile(fileName.valid.template1, 'browse')
            .verifyChooseFileSuccess(fileName.valid.template1)
            .clickUploadButton()
            .verifyShowUploadingPopup()
            .verifyShowUploadCompletedSuccess();
    })

    it('D_011 When seller click “Choose Another File” button, window should be open to select the file', () => {
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile(fileName.valid.template1, 'browse')
            .verifyChooseFileSuccess(fileName.valid.template1)
            .clickChooseFilesButtonAndSelectFile(fileName.valid.template2, 'another')
            .verifyChooseFileSuccess(fileName.valid.template2);
    })

    it('D_012 When seller click on “Checkbox”, show checked of checkbox', () => {
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile(fileName.valid.template1, 'browse')
            .verifyChooseFileSuccess(fileName.valid.template1)
            .clickCheckbox(true);
    })

    it('D_013 When seller click on “Checkbox”, show checked of checkbox', () => {
        dynamicSpreadsheetPage
            .clickCheckbox();
    })

    it('D_014 When seller click “Download” hyperlink, the file CSV sample file downloaded', () => {
        dynamicSpreadsheetPage
            .clickDownloadFileTemplate();
    })

    it('D_015 When seller click “click here” hyperlink, open new tab Dynamic Spreadsheet Upload', () => {
        dynamicSpreadsheetPage
            .clickOpenLink('hereLink')
            .verifyShowDynamicSpreadsheetUploadPage();
    })

    it('D_016 When seller click “How to get CSV file from Shopee” hyperlink, open Shopee tab', () => {
        loginPage.checkLoginExit(user.valid.email, user.valid.password);
        homePage.clickProductsOnMenu();
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickOpenLink('shopee')
            .verifyShowOpenLinkGetCSVFile('shopee');
    })

    it('D_017 When seller click “How to get CSV file from Lazada” hyperlink, open Lazada tab', () => {
        loginPage.checkLoginExit(user.valid.email, user.valid.password);
        homePage.clickProductsOnMenu();
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickOpenLink('lazada')
            .verifyShowOpenLinkGetCSVFile('lazada');
    })

    it('D_018 When seller click “How to get CSV file from Tokopedia” hyperlink, open Tokopedia tab', () => {
        loginPage.checkLoginExit(user.valid.email, user.valid.password);
        homePage.clickProductsOnMenu();
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickOpenLink('tokopedia')
            .verifyShowOpenLinkGetCSVFile('tokopedia');
    })

    it('D_019 When seller click “How to get CSV file from Woo Commerce” hyperlink, open Woo Commerce tab', () => {
        loginPage.checkLoginExit(user.valid.email, user.valid.password);
        homePage.clickProductsOnMenu();
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickOpenLink('wooCommerce')
            .verifyShowOpenLinkGetCSVFile('wooCommerce');
    })

    it('D_020 When seller click “How to get CSV file from Big Commerce” hyperlink, open Big Commerce tab', () => {
        loginPage.checkLoginExit(user.valid.email, user.valid.password);
        homePage.clickProductsOnMenu();
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickOpenLink('bigCommerce')
            .verifyShowOpenLinkGetCSVFile('bigCommerce');
    })

    it('D_021 When seller upload CSV file success, the data should be synced to seller dashboard', () => {
        loginPage.checkLoginExit(user.valid.email, user.valid.password);
        homePage.clickProductsOnMenu();
        productPage.clickDynamicSpreadsheetButton();
        dynamicSpreadsheetPage
            .clickChooseFilesButtonAndSelectFile(fileName.valid.template, 'browse')
            .verifyChooseFileSuccess(fileName.valid.template)
            .clickUploadButton()
            .verifyShowUploadingPopup()
            .verifyShowUploadCompletedSuccess();
        homePage.clickOdersOnMenu().clickProductsOnMenu();
        productPage.verifyProductAfterUploadCSVFileSuccess('example pants');
    })
})