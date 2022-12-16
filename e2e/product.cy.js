/// <reference types="Cypress" />
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homepage");
const { ProductPage } = require("../pages/productPage");
const { AddProductPage } = require("../pages/addProductPage");
const { ShopifyIntegrationPage } = require("../pages/shopifyIntegrationPage");
import user from "../fixtures/userData.json";
import fileName from "../fixtures/fileNames.json";
import { getRandomText } from "../support/functionCommon";
let email = user.valid.email;
let password = user.valid.password;
const loginPage = new LoginPage();
const homePage = new HomePage();
const productPage = new ProductPage();
const addProductPage = new AddProductPage();
const shopifyIntegrationPage = new ShopifyIntegrationPage();
var productName = 'Add test product manully';


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
            .verifyShowMessageBarNotification(true);
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
            .verifyShowMessageBarNotification(true);
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
            .clickDeleteProduct(productName, true)
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

    it('E_ When seller blank all field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage.clickSaveButton()
            .verifyShowWarningMessage('Title', 'Title is required')
            .verifyShowWarningMessage('Description', 'Description is required')
            .verifyShowWarningMessage('Price', 'Price is required')
            .verifyShowWarningMessage('Category', 'Category is required')
            .verifyShowWarningMessage('Quantity', 'Quantity is required')
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight is required')
            .verifyShowWarningMessage('Occasions', 'Occasions is required')
            .verifyShowWarningMessage('Auto-Tagging', 'Please add Image to “Generate Tags”')
        cy.contains('Media is required').should('be.visible');
    })

    it('E_ When seller enter all field - blank “TITLE” and “DESCRIPTION” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('', '', '', 100, 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Title', 'Title is required')
            .verifyShowWarningMessage('Description', 'Description is required')
    })

    it('E_ When seller enter all field - blank “TITLE” and “Media” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('', '', '', 100, 99, 1, '', 'Clothing', 3)
            .clickSaveButton()
            .verifyShowWarningMessage('Title', 'Title is required')
        cy.contains('Media is required').should('be.visible');
    })

    it('E_ When seller enter all field - blank “TITLE” and “PRICE” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('', 'Description', '', '', 99, 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Title', 'Title is required')
            .verifyShowWarningMessage('Price', 'Price is required')
    })

    it('E_ When seller enter all field - blank “TITLE” and “QUANTITY” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('', 'Description', '', '59.95', '', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton().clickSaveButton()
            .verifyShowWarningMessage('Title', 'Title is required')
            .verifyShowWarningMessage('Quantity', 'Quantity is required')
    })

    it('E_ When seller enter all field - blank “TITLE” and “Shipping Weight” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('', 'Description', '', '59.95', '999', '', fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton().clickSaveButton()
            .verifyShowWarningMessage('Title', 'Title is required')
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight is required')
    })

    it('E_ When seller enter all field - blank “DESCRIPTION” and “Media” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', '', '', 100, 99, 1, '', 'Clothing', 3)
            .clickSaveButton()
            .verifyShowWarningMessage('Description', 'Description is required')
        cy.contains('Media is required').should('be.visible');
    })

    it('E_ When seller enter all field - blank “DESCRIPTION” and “PRICE” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', '', '', '', '999', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton().clickSaveButton()
            .verifyShowWarningMessage('Description', 'Description is required')
            .verifyShowWarningMessage('Price', 'Price is required')
    })

    it('E_ When seller enter all field - blank “DESCRIPTION” and “QUANTITY” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', '', '', '59.95', '', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton().clickSaveButton()
            .verifyShowWarningMessage('Description', 'Description is required')
            .verifyShowWarningMessage('Quantity', 'Quantity is required')
    })

    it('E_ When seller enter all field - blank “DESCRIPTION” and “Shipping Weight” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', '', '', '59.95', '999', '', fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowWarningMessage('Description', 'Description is required')
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight is required')
    })

    it('E_ When seller enter all field - blank “Media” and “PRICE” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', 'Descripton product', '', '', '999', '', '', 'Clothing', 3)
            .clickSaveButton()
            .verifyShowWarningMessage('Price', 'Price is required')
        cy.contains('Media is required').should('be.visible');
    })

    it('E_ When seller enter all field - blank “Media” and “QUANTITY” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', 'Descripton product', '', '59.95', '', 1, '', 'Clothing', 3)
            .clickSaveButton()
            .verifyShowWarningMessage('Quantity', 'Quantity is required');
        cy.contains('Media is required').should('be.visible');
    })

    it('E_ When seller enter all field - blank “Media” and “Shipping Weight” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', 'Descripton product', '', '59.95', '999', '', '', 'Clothing', 3)
            .clickSaveButton()
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight is required');
        cy.contains('Media is required').should('be.visible');
    })

    it('E_ When seller enter all field - blank “PRICE” and “QUANTITY” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', 'Description', '', '', '', 1, fileName.valid.image, 'Clothing', 3)
            .clickSaveButton()
            .clickAddTagButton()
            .verifyShowWarningMessage('Price', 'Price is required')
            .verifyShowWarningMessage('Quantity', 'Quantity is required');
    })

    it('E_ When seller enter all field - blank “PRICE” and “Shipping Weight” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', 'Description', '', '', '999', '', fileName.valid.image, 'Clothing', 3)
            .clickSaveButton()
            .clickAddTagButton()
            .verifyShowWarningMessage('Price', 'Price is required')
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight is required');
    })

    it('E_ When seller enter all field - blank “QUANTITY” and “Shipping Weight” field, show warning message', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct('Title Product', 'Description', '', '59.95', '', '', fileName.valid.image, 'Clothing', 3)
            .clickSaveButton()
            .clickAddTagButton()
            .verifyShowWarningMessage('Quantity', 'Quantity is required')
            .verifyShowWarningMessage('Shipping Weight', 'Shipping Weight is required');
    })

    it('E_ Verify that create product success when seller enter valid data all field', () => {
        const quantity = '999';
        const addFile = fileName.valid.image;
        const category = 'Clothing';
        const product = 'ProductCreat Success';
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton()
        addProductPage
            .inputInforProduct(product, 'Description test', '', '79.95', '999', 1, addFile, category, 3)
            .clickAddTagButton()
            .clickSaveButton()
            .verifyShowMessageBarCreatedProductSuccess()
        productPage.verifyProductAddSuccess(product, quantity, '', category)
            .clickDeleteProduct(product, true)
            .verifyDeleteProductSuccess(product);
    })

    it('E_ Verify that show Error Message Bar Notification when seller saving before generating tags', () => {
        const product = 'Product Generating tag';
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct(product, 'Description test', '', '79.95', '999', 1, fileName.valid.image, 'Clothing', 3)
            .inputTag('ABC')
            .clickSaveButton()
            .verifyShowMessageBarNotification(false);
        productPage.verifyProductAddSuccess(product, '999', '', 'Clothing')
            .clickDeleteProduct(product, true)
            .verifyDeleteProductSuccess(product);
    })

    it('E_ When seller click check-box before product name, display “More Actions” dropdown button', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct(productName, 'Description test', '', '79.95', '999', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton();
        productPage.verifyProductAddSuccess(productName, '999', '', 'Clothing')
            .clickCheckboxProduct(true);
    })

    it('E_ When seller click “More Actions” dropdown button, show list actions', () => {
        productPage
            .clickMoreActionsButton()
            .verifyShowMoreActionsList();
    })

    it('E_ When seller select “Set as active” in list actions, product should be change status to Active', () => {
        productPage
            .selectActions('Set as active', true)
            .verifyShowMessage(productPage.msgChangeStatusComplate)
            .verifyProductAddSuccess(productName, '999', 'Active', 'Clothing');
    })

    it('E_ When seller select “Set as draft” in list actions, product should be change to Draft', () => {
        productPage
            .clickCheckboxProduct(true)
            .clickMoreActionsButton()
            .selectActions('Set as draft', true)
            .verifyShowMessage(productPage.msgChangeStatusComplate)
            .verifyProductAddSuccess(productName, '999', 'Draft', 'Clothing');
    })

    it('E_ When seller select “Archive products” in list actions, product should be change to Archive', () => {
        productPage
            .clickCheckboxProduct(true)
            .clickMoreActionsButton()
            .selectActions('Archive products', true)
            .verifyShowMessage(productPage.msgChangeStatusComplate)
            .verifyProductAddSuccess(productName, '999', 'Archived', 'Clothing');
    })

    it('E_ When seller select “Duplicate products” in list actions, product should be Duplicated', () => {
        const product = productName + ' (Duplicated)';
        productPage
            .clickCheckboxProduct()
            .clickMoreActionsButton()
            .selectActions('Duplicate products')
            .verifyShowMessage(productPage.msgDuplicateComplate)
            .verifyProductAddSuccess(product, '999', 'Draft', 'Clothing')
            .clickDeleteProduct(product, true)
            .verifyDeleteProductSuccess(product);
    })

    it('E_ When seller select “Delete products” in list actions, show “Delete selected products?” popup', () => {
        productPage
            .searchProduct(productName)
            .clickCheckboxProduct(true)
            .clickMoreActionsButton()
            .selectActions('Delete products')
            .verifyShowDeletePopupConfirm(true, productPage.deleteSeleteProductPopupText);
    })

    it('E_ When seller click “Cancel” button, “Delete selected products?” popup should be hide', () => {
        productPage
            .clickPopupButton(productPage.cancelBtn)
            .verifyShowDeletePopupConfirm(false, productPage.deleteSeleteProductPopupText);
    })

    it('E_ When seller click “Delete” button, product should be deleted and show Message Bar Notification', () => {
        productPage
            .searchProduct(productName)
            .clickCheckboxProduct(true)
            .clickMoreActionsButton()
            .selectActions('Delete products')
            .clickPopupButton(productPage.deleteBtn)
            .verifyShowMessage(productPage.msgDeletedComplate)
            .verifyDeleteProductSuccess(productName);
    })

    it('E_ When seller select “Add to collection(s)” in list actions, show “Add products to collections” popup', () => {
        homePage.clickProductsOnMenu();
        productPage.clickAddProductButton();
        addProductPage
            .inputInforProduct(productName, 'Description test', '', '79.95', '999', 1, fileName.valid.image, 'Clothing', 3)
            .clickAddTagButton()
            .clickSaveButton();
        productPage
            .searchProduct(productName)
            .clickCheckboxProduct(true)
            .clickMoreActionsButton()
            .selectActions('Add to collection(s)')
            .clickCheckboxCollectionPopup('add')
            .clickPopupButton(productPage.applyBtn)
            .verifyShowMessage(productPage.msgAddCollectionComplate)
            .searchProduct(productName)
            .verifyProductAddRemoveCollectionSuccess('Collection 1', 'add');
    })

    it('E_ When seller select “Remove from collection(s)” in list actions, show “Remove products to collections” popup', () => {
        productPage
            .clickCheckboxProduct(true)
            .clickMoreActionsButton()
            .selectActions('Remove from collection(s)')
            .clickCheckboxCollectionPopup('remove')
    })

    it('E_ Verify that product will remove from collection when seller click “Remove” button', () => {
        productPage
            .clickPopupButton(productPage.removeBtn)
            .verifyShowMessage(productPage.msgRemoveCollectionComplate)
            .searchProduct(productName)
            .verifyProductAddRemoveCollectionSuccess('Collection 1', 'remove');
    })

    it('E_ Verify that product do not remove collection when seller not apply collection', () => {
        homePage.clickOdersOnMenu()
            .clickProductsOnMenu();
        productPage
            .searchProduct(productName)
            .clickCheckboxProduct(true)
            .clickMoreActionsButton()
            .selectActions('Add to collection(s)')
            .clickCheckboxCollectionPopup('add')
            .clickPopupButton(productPage.applyBtn)
            .clickCheckboxProduct(true)
            .clickMoreActionsButton()
            .selectActions('Remove from collection(s)')
            .clickPopupButton(productPage.removeBtn)
            .verifyShowMessage('Product has no collections')
            .clickPopupButton(productPage.cancelBtn)
    })

    it('E_ When seller click “Duplicate” icon, product should be duplicated', () => {
        productPage
            .clickDuplicateProduct(productName)
            .verifyProductAddSuccess(productName + ' (Duplicated)', '999', 'Draft', 'Clothing')
    })

    it('E_ When seller click “Delete” icon, show “Delete product?” popup', () => {
        const product = productName + ' (Duplicated)';
        productPage
            .clickDeleteProduct(product)
            .verifyShowDeletePopupConfirm(true, productPage.deleteThisProductPopupText)
            .clickPopupButton(productPage.cancelBtn);
    })

    it('E_ When seller click “arrow icon” of status, show list status', () => {
        const product = productName + ' (Duplicated)';
        productPage
            .clickStatusListBoxProduct(product);
    })

    it('E_ Verify that status change to Active when seller click “Active”', () => {
        const product = productName + ' (Duplicated)';
        productPage
            .selectStatusValueProduct(productPage.activeStatus)
            .verifyProductAddSuccess(product, '999', 'Active', 'Clothing');
    })

    it('E_ Verify that status change to Archived when seller clcik “Archived”', () => {
        const product = productName + ' (Duplicated)';
        productPage
            .clickStatusListBoxProduct(product)
            .selectStatusValueProduct(productPage.archivedStatus)
            .verifyProductAddSuccess(product, '999', 'Archived', 'Clothing')
            .clickDeleteProduct(product, true);
    })

    it('E_ When seller click anywhere of product, open Product details tab', () => {
        homePage.clickOdersOnMenu()
            .clickProductsOnMenu();
        productPage.openDetailProductPage(productName)
        addProductPage.clickBackIcon()
        productPage.clickDeleteProduct(productName, true);
    })

})