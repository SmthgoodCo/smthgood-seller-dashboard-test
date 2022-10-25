export class ShopifyIntegrationPage {
    constructor() {
        this.shopifyIntegrationTitle = 'Integrate with Shopify';
        this.shopifyIntegrationText = 'To integrate your smthgood and Shopify inventories, simply follow the steps below.';
        this.hereLink = '[rel="noreferrer"]';
        this.shopifyIntegrationPageTitle = 'Shopify Integration';
        this.leftArrowIconBtn = 'img[alt="Prev"]';
        this.leftImageTxt = 'Under Settings, copy your shop url and input in the SHOP URL field below.';
        this.rightArrowIconBtn = 'img[alt="Next"]';
        this.rightImageTxt = 'Go to your shopify admin panel, click on Settings at the bottom left.';
        this.slideImageSrc = 'img[alt="slider1"]';
        this.cancelBtn = 'Cancel';
        this.formInfo = 'form>.MuiGrid-root';
        this.yourShopifyApiKeyInput = 'input[name="apiKey"]';
        this.adminApiAccessTokenInput = 'input[name="accessToken"]';
        this.shopUrlInput = 'input[name="domain"]';
        this.webhookVersionInput = 'input[name="webhook"]';
        this.startIntegrationBtn = 'Start Integration';
    }

    verifyShowIntegrateWithShopifyPoup() {
        cy.contains(this.shopifyIntegrationTitle).should('be.visible');
        cy.contains(this.shopifyIntegrationText).should('be.visible');
        return this;
    }

    clickHereLink() {
        cy.get(this.hereLink)
            .contains('here')
            .invoke('removeAttr', 'target')
            .click();
        return this;
    }

    verifyShowShopifyIntegrationPage() {
        cy.url().should('include', 'shopify-integration');
        cy.contains(this.shopifyIntegrationPageTitle).should('be.visible');
        return this;
    }

    clickArrowIconButon(arrow = "") {
        switch (arrow) {
            case 'left':
                cy.get(this.leftArrowIconBtn).click();
                this.verifyShowSlideImage(this.leftImageTxt);
                break;
            case 'right':
                cy.get(this.rightArrowIconBtn).click();
                this.verifyShowSlideImage(this.rightImageTxt);
                break;
        }
        return this;
    }

    verifyShowSlideImage(imageText = '') {
        cy.get(this.slideImageSrc)
            .should('have.attr', 'src')
            .and('include', '/static/media/imgSlider');
        cy.wait(2000);
        cy.get(this.slideImageSrc)
            .parent()
            .next()
            .should('have.text', imageText);
        return this;
    }

    clickCancelButton() {
        cy.contains(this.cancelBtn).click();
        return this;
    }

    inputIntegrateShopifyInfo(apiKey = '', token = '', shopUrl = '', webhook = '') {
        if (apiKey != '') {
            cy.get(this.yourShopifyApiKeyInput).clear();
            cy.get(this.yourShopifyApiKeyInput).type(apiKey);
        }
        if (token != '') {
            cy.get(this.adminApiAccessTokenInput).clear();
            cy.get(this.adminApiAccessTokenInput).type(token);
        }
        if (shopUrl != '') {
            cy.get(this.shopUrlInput).clear();
            cy.get(this.shopUrlInput).type(shopUrl);
        }
        if (webhook != '') {
            cy.get(this.webhookVersionInput).clear();
            cy.get(this.webhookVersionInput).type(webhook);
        }
        return this;
    }

    verifyShowErrorMsg(errorMsg = '', eq = '') {
        cy.get(this.formInfo)
            .children()
            .eq(eq)
            .scrollIntoView()
            .contains(errorMsg)
            .should('be.visible');
        return this;
    }

    clickStartIntegrationButton() {
        cy.contains(this.startIntegrationBtn).click();
        return this;
    }
}