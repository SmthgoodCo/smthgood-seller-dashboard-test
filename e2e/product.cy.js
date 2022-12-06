/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { ProductPage } = require("../pages/productPage");
const { AddProductPage } = require("../pages/addProductPage");
const { ShopifyIntegrationPage } = require("../pages/shopifyIntegrationPage");
import user from "../fixtures/userData.json";
import fileName from "../fixtures/fileNames.json";
let email = user.valid.email;
let password = user.valid.password;
const loginPage = new LoginPage();
const homePage = new HomePage();
const productPage = new ProductPage();
const addProductPage = new AddProductPage();
const shopifyIntegrationPage = new ShopifyIntegrationPage();

describe('Product Functionality - First Login', () => {
    beforeEach(()=> {
        loginPage
        .goToLoginPage()
        .loginWithUser(user.valid.email1, user.valid.password1)
        .clickLoginButton()
        .verifyInHomePage();
    })

    it('C_001 Show Products - empty When seller click PRODUCTS', () => {
        homePage.clickProductsOnMenu();
        productPage
            .verifyEmptyProductMessages()
            .verifyShowProductPage();
    })

    it('C_002 Show Products - empty When seller click PRODUCTS', () => {
        homePage.clickProductsOnMenu();
        productPage
            .verifyShowlistProduct();
    })
})

describe('Product Functionality', () => {
    before(() => {
        loginPage
            .goToLoginPage()
            .loginWithUser(email, password)
            .clickLoginButton()
            .verifyInHomePage();
    })

    it('C_003 When seller click “Add Product” button in product list page, show add product page', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage.verifyShowAddProductPage();
    })

    it('C_004 When seller click “back” icon left side Add Product, show product list page', () => {
        addProductPage.clickBackIcon();
        productPage.verifyShowProductPage();
    })

    it('C_005 When seller leave “TITLE” field blank, show warning message', () => {
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('', 'test2', '', 100, 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Title', 'Title is required');
    })

    it('C_006 When seller enter space in “TITLE” field, show Message Bar Notification', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('   ', 'test2', '', 100, 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowMessageBarNotification();
    })


    it('C_007 When seller leave “DESCRIPTION” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('test2', '', '', 100, 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Description', 'Description is required');
    })

    it('C_008 When seller enter space in “DESCRIPTION” field, show Message Bar Notification', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('test2', '   ', '', 100, 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowMessageBarNotification();
    })

    it('C_009 When seller leave “PRICE” field blank, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '', 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Price', 'Price is required');
    })

    it('C_010 When seller enter space in “PRICE” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '   ', 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Price', 'Price should be a number');
    })

    it('C_011 When seller enter special character in “PRICE” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '!@#$%', 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Price', 'Price should be a number');
    })

    it('C_012 When seller enter character data in “PRICE” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', 'abcdef', 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Price', 'Price should be a number');
    })

    it('C_017 When seller leave “QUANTITY” field blank, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '123', '', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Quantity', 'Quantity is required');
    })

    it('C_018 When seller enter space in “QUANTITY” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '123', '   ', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Quantity', 'Quantity should be a number');
    })

    it('C_019 When seller enter special character in “QUANTITY” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '123', '!@#$%', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Quantity', 'Quantity should be a number');
    })

    it('C_020 When seller enter character data in “QUANTITY” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '123', 'abcdef', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Quantity', 'Quantity should be a number');
    })

    it('C_021 When seller click on check-box “Option”, show Size Options and Colour / Material Options', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .clickOptionCheckbox(true);
    })

    it('C_022 When click on check-box to uncheck Options, Size Options and Colour Options will hide', () => {
        addProductPage
            .clickOptionCheckbox(false);
    })

    it('C_023 when seller enter required fields successfully, check product imported successfully', () => {
        const productName = 'Add test product manully';
        const quantity = '123';
        const addFile = fileName.valid.image;
        const category = 'Clothing';

        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton()

        addProductPage
            .inputInforProduct(productName, 'Description test', '', '99.95', quantity, 1, addFile, category, 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowMessageBarCreatedProductSuccess()
        productPage.verifyProductAddSuccess(productName, quantity, '', category)
            .clickDeleteProduct(productName)
            .verifyDeleteProductSuccess(productName);
    })

    it.only('E_019 When click on Add icon in Size option, displays Add option value field', () => {
        homePage.clickProductsOnMenu();

        productPage.clickAddProductButton();
        addProductPage
            .clickOptionCheckbox(true)
            .clickPlusIcon(addProductPage.sizeOptionsText);
    })

    it.only('E_020 When seller enter size option in Add option value field, Done button will be enable', () => {
        addProductPage
            .inputAddOptionValue(addProductPage.sizeOptionsText, 0, 'S')
            .inputAddOptionValue(addProductPage.sizeOptionsText, 1, 'M');
    })

    it.only('E_021 When seller click “Delete” icon in Size option, show popup Delete Size Option', () => {
        addProductPage
            .clickDeleteOption(addProductPage.sizeOptionsText)
            .verifyShowDeletePopup(true);
    })

    it.only('E_022 When seller click “Remove” button, Size Option will be remove', () => {
        addProductPage
            .clickButton(addProductPage.removeBtn)
            .verifyShowDeletePopup(false)
            .verifyRemoveOptionSuccess(1)
            .clickDeleteOption(addProductPage.sizeOptionsText)
            .clickButton(addProductPage.removeBtn)
            .verifyShowDeletePopup(false)
            .verifyRemoveOptionSuccess(0);
    })

})