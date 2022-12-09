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
const productName = 'Add test product manully';


describe('Product Functionality - First Login', () => {
    beforeEach(() => {
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

    it('E_001 When seller click “Add Product” button in product list page, show add product page', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage.verifyShowAddProductPage();
    })

    it('E_002 When seller click “back” icon left side Add Product, show product list page', () => {
        addProductPage.clickBackIcon();
        productPage.verifyShowProductPage();
    })

    it('E_003 When seller leave “TITLE” field blank, show warning message', () => {
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('', 'test2', '', 100, 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Title', 'Title is required');
    })

    it('E_004 When seller enter space in “TITLE” field, show Message Bar Notification', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('   ', 'test2', '', 100, 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowMessageBarNotification();
    })


    it('E_005 When seller leave “DESCRIPTION” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('test2', '', '', 100, 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Description', 'Description is required');
    })

    it('E_006 When seller enter space in “DESCRIPTION” field, show Message Bar Notification', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('test2', '   ', '', 100, 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowMessageBarNotification();
    })

    it('E_007 When seller leave “PRICE” field blank, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '', 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Price', 'Price is required');
    })

    it('E_008 When seller enter space in “PRICE” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '   ', 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Price', 'Price should be a number');
    })

    it('E_009 When seller enter special character in “PRICE” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '!@#$%', 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Price', 'Price should be a number');
    })

    it('E_010 When seller enter character data in “PRICE” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', 'abcdef', 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Price', 'Price should be a number');
    })

    it('E_013 When seller leave “QUANTITY” field blank, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '123', '', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Quantity', 'Quantity is required');
    })

    it('E_014 When seller enter space in “QUANTITY” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '123', '   ', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Quantity', 'Quantity should be a number');
    })

    it('E_015 When seller enter special character in “QUANTITY” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '123', '!@#$%', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Quantity', 'Quantity should be a number');
    })

    it('E_016 When seller enter character data in “QUANTITY” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('product name', 'Description test', '', '123', 'abcdef', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Quantity', 'Quantity should be a number');
    })

    it('E_017 When seller click on check-box “Option”, show Size Options and Colour / Material Options', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .clickOptionCheckbox(true);
    })

    it('E_018 When click on check-box to uncheck Options, Size Options and Colour Options will hide', () => {
        addProductPage
            .clickOptionCheckbox(false);
    })

    it('E_019 When click on Add icon in Size option, displays Add option value field', () => {
        addProductPage
            .clickOptionCheckbox(true)
            .clickPlusIcon(addProductPage.sizeOptionsText);
    })

    it('E_020 When seller enter size option in Add option value field, Done button will be enable', () => {
        addProductPage
            .inputAddOptionValue(addProductPage.sizeOptionsText, 0, 'S')
            .inputAddOptionValue(addProductPage.sizeOptionsText, 1, 'M');
    })

    it('E_021 When seller click “Delete” icon in Size option, show popup Delete Size Option', () => {
        addProductPage
            .clickDeleteOption(addProductPage.sizeOptionsText)
            .verifyShowDeletePopup(true);
    })

    it('E_022 When seller click “Remove” button, Size Option will be remove', () => {
        addProductPage
            .clickButton(addProductPage.removeBtn)
            .verifyShowDeletePopup(false)
            .verifyRemoveOptionSuccess(1)
            .clickDeleteOption(addProductPage.sizeOptionsText)
            .clickButton(addProductPage.removeBtn)
            .verifyShowDeletePopup(false)
            .verifyRemoveOptionSuccess(0);
    })

    it('E_023 When seller click “Cancel” button on popup Delete Size Option, popup disable', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .clickOptionCheckbox(true)
            .clickPlusIcon(addProductPage.sizeOptionsText);

        addProductPage
            .inputAddOptionValue(addProductPage.sizeOptionsText, 0, 'S')
            .clickDeleteOption(addProductPage.sizeOptionsText)
            .verifyShowDeletePopup(true)
            .clickButton(addProductPage.cancelBtn)
            .verifyShowDeletePopup(false)
    })

    it('E_024 When user input all required field, user can submit to create product without error', () => {
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
        productPage.verifyProductAddSuccess(productName, quantity, '', category);
    })

    it('E_025 User can delete product', () => {
        productPage
            .clickDeleteProduct(productName)
            .verifyDeleteProductSuccess(productName);
    })

    it('E_026 When seller leave “Shipping Weight” field blank, show warning message', () => {
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('test2', '', '', 100, 99, '', fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight is required');
    })

    it('E_027 When seller enter space in “Shipping Weight” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('test2', '', '', 100, 99, '   ', fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight should be a number');
    })

    it('E_028 When seller enter data character in “Shpping Weight” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('test2', '', '', 100, 99, 'abcdef', fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight should be a number');
    })

    it('E_029 When seller enter special character in “Shipping Weight” field, show warning message', () => {
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('test2', '', '', 100, 99, '!@#$%', fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight should be a number');
    })

    it('E_030 When seller click arrow icon in Status field, show list status in dropdown', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage.clickStatusListBox();
    })

    it('E_032 When seller click “Archived”, status of product is Archived', () => {
        homePage.clickOutsideDropdown();
        addProductPage.clickBackIcon();
        productPage.clickAddProductButton();
        addProductPage.selectStatusValue(addProductPage.archivedStatus);
    })

    it('E_031 When seller click “Draft”, status of product is Draft', () => {
        addProductPage
            .selectStatusValue(addProductPage.draftStatus);
    })

    it('E_033 When seller click “Active”, status of product is Active', () => {
        addProductPage
            .selectStatusValue(addProductPage.activeStatus);
    })

    it('E_034 When seller click “click here” hyperlink, open Sustainability and Ethical Values page', () => {
        addProductPage
            .clickHereLink();
    })

    it('E_036 When seller click “arrow” icon in Category field, show list Category dropdown', () => {
        loginPage
            .goToLoginPage()
            .loginWithUser(email, password)
            .clickLoginButton()
        homePage.clickProductsOnMenu()
        productPage.clickAddProductButton()
        addProductPage.clickCategory()
            .verifyShowListCategory();

    })

    it('E_037 When seller click “arrow” icon in some category, show list Sub-Category', () => {
        addProductPage.clickSubCategory();
    })

    it('E_038 When seller select Occasions and check-box, Occasions should checked', () => {
        addProductPage.clickOccasionsCheckbox('Active', true);
    })

    it('E_039 When seller click to uncheck, Occasions checked should be uncheck', () => {
        addProductPage.clickOccasionsCheckbox('Vacation', false);
    })

    it('E_040 Verify that seller can choose multiple occasions at the same time', () => {
        addProductPage
            .clickOccasionsCheckbox('Special', true)
            .clickOccasionsCheckbox('Swimwear', true)
            .clickOccasionsCheckbox('Day out', true)
            .clickOccasionsCheckbox('Party', true);
    })

})