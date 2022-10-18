export class HomePage {
    constructor() {
        this.sellerName = '.MuiGrid-root .jss15';
        this.helpBtn = 'Help';
        this.messagesBtn = 'Messages';
        this.OrderEmptyText = "You do not have any orders at the moment.";
        this.sellerDropdown = '.MuiMenu-list';
        this.editProfileLink = "Edit Profile";
    }

    verifyDisplaySellerName(selller = "") {
        cy.get(this.sellerName).should('have.text', selller);
        return this;
    }

    clickSellerName() {
        cy.get(this.sellerName).click();
        return this;
    }

    clickOutsideDropdown() {
        cy.get('body').click(0,0);;
        return this;
    }

    verifyInformationDropdown() {
        cy.contains('Review').should('be.visible');
        cy.contains('Listings').should('be.visible');
        cy.contains('Followers').should('be.visible');
        cy.contains('Edit Profile').should('be.visible');
        cy.contains('Sustainability Values').should('be.visible');
        cy.contains('Store Policies').should('be.visible');
        cy.contains('Sign Out').should('be.visible');
        return this;
    }

    verifyTurnOffDropdownPopup() {
        cy.contains('Review').should('exist');
        cy.contains('Review').should('not.be.visible');
        cy.contains('Edit Profile').should('exist');
        cy.contains('Edit Profile').should('not.be.visible');
        return this;
    }

    clickHelpButton() {
        cy.contains(this.helpBtn).click();
        return this;
    }

    clickMessagesButton() {
        cy.window().then(win => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url;
            })
        })

        cy.contains(this.messagesBtn).click();
        return this;
    }

    verifyOrdrEmpty() {
        cy.contains(this.OrderEmptyText).should('be.visible');
        return this;
    }

    clickEditProfileLink() {
        cy.window().then(win => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url;
            })
        })

        cy.contains(this.editProfileLink).click();
        return this;
    }

    verifyInEditProfilePage() {
        cy.url().should('include', 'https://app-smthgood.vinova.sg/profile/edit-profile?');
        return this;
    }

    verifyInMessagesPage() {
        cy.url().should('include', 'https://app-smthgood.vinova.sg/');
        return this;
    }
}