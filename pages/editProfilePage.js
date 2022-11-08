export class EditProfilePage {

  verifyShowEditProfilePage() {
    cy.wait(12000)
    cy.get("flt-glass-pane").click();
    cy.get("flt-glass-pane").shadow()
      .find("flt-span").contains('Username').should('be.visible');
    cy.get("flt-glass-pane").shadow()
      .find("flt-span").contains('Email').should('be.visible');
    cy.get("flt-glass-pane").shadow()
      .find("flt-span").contains('Password').should('be.visible');
    return this;
  }

  inputUsername(username = '') {
    cy.wait(5000);
    cy.get("flt-glass-pane").click();
    cy.get("flt-glass-pane").shadow()
      .find('input.flt-text-editing').clear({force: true}).type(username, {force: true});
    return this;
  }

  verifyUsername(username = '') {
    cy.wait(5000);
    cy.get("flt-glass-pane").click();
    cy.get("flt-glass-pane").shadow()
      .find('input.flt-text-editing').should('have.value', username);
    return this;
  }

  verifyErrorMsg(msg = '') {
    cy.wait(5000);
    cy.get("flt-glass-pane").click();
    cy.get("flt-glass-pane").shadow()
      .find('flt-scene-host')
      .find('flt-transform')
      .find('flt-clip-interior')
      .find('flt-paragraph').contains(msg).should('be.visible')
    return this;
  }

  clickSaveButton() {
    cy.get("flt-glass-pane").shadow().within(() => {
      cy.get('flt-scene-host').find('flt-span').contains('SAVE').click({force: true});
    })
    return this;
  }
}