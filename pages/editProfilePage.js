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
      .find('input.flt-text-editing').clear({ force: true }).type(username, { force: true });
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
      cy.get('flt-scene-host').find('flt-span').contains('SAVE').click({ force: true });
    })
    return this;
  }

  // Click New Password field
  clickPasswordField() {
    cy.wait(5000);
    cy.get("flt-glass-pane").click();
    cy.get("flt-glass-pane").shadow()
      .find('flt-span').contains('Password')
      .parent('flt-paragraph')
      .parent('flt-canvas')
      .parent('flt-picture')
      .next('flt-offset').click({ force: true })
      .find('flt-span').contains('***').click({ force: true })
    cy.get("flt-glass-pane").shadow()
      .find('input').type('123456')

    cy.get("flt-glass-pane").shadow()
      .find('flt-span').contains('Current').click({ force: true });
    cy.get("flt-glass-pane").click();
    cy.get("flt-glass-pane").shadow()
      .find('flt-span').contains('Current')
      .parents('flt-picture').next('flt-color-filter').next('flt-offset')
      .next('flt-picture').find('flt-clip').click('left', {force: true});
      
      // .next('flt-picture').next('flt-color-filter').find('flt-clip').click('left', {force: true});
      // cy.get("flt-glass-pane").click().shadow().find('input').type('999999');
    //   .next('flt-picture').next('flt-color-filter').next('flt-offset').click({ force: true });
    // cy.get('flt-transform').first().click({force: true})
    // cy.get("flt-glass-pane").shadow().find('input').type('123456');


    // .find('flt-offset').last().next('flt-transform').click({force: true});
    // .find('flt-offset').last().click({ force: true }).next('flt-transform').click({force: true});

    // .parents('flt-picture').next('flt-picture').next('flt-offset').children('flt-transform').click({ force: true });

    // .next('flt-color-filter').next('flt-offset').children('flt-transform').click({ force: true });
    return this;
  }

  // Click Odl Password field
  // clickPasswordField() {
  //   cy.wait(5000);
  //   cy.get("flt-glass-pane").click();
  //   cy.get("flt-glass-pane").shadow()
  //     .find('flt-span').contains('Password')
  //     .parent('flt-paragraph')
  //     .parent('flt-canvas')
  //     .parent('flt-picture')
  //     .next('flt-offset').click({ force: true })
  //     .find('flt-span').contains('***').click({ force: true })
  //   cy.get("flt-glass-pane").shadow().find('input').type('123456');
  //   cy.get("flt-glass-pane").shadow()
  //   //   .find('input').click({ force: true }).type('654321');
  //     .find('flt-span').contains('Current').click({force: true});
  //   cy.get("flt-glass-pane").shadow()
  //     .find('flt-span').contains('Current')
  //     .parents('flt-picture').next('flt-color-filter').next('flt-offset').children('flt-transform').click({force:true});
  //   return this;
  // }
  inputChangePassword() {
    // cy.get("flt-glass-pane").click({ force: true });
    // cy.get("flt-glass-pane").shadow()
    // .querySelector('[class="flt-text-editing transparentTextEditing"]').click();
    // document.querySelector('flt-glass-pane').shadow-root(open).querySelector('[class="flt-text-editing transparentTextEditing"]').click();
    // .find('input.flt-text-editing').click({ force: true })
    // .find('flt-span').contains('Current')
    // .parents('flt-picture').next('flt-color-filter').next('flt-offset').click({ force: true })
    //   .siblings('flt-offset').eq(2).click({force: true})
    // cy.get('input.flt-text-editing')
    //   .click().type('123456', {force: true})
    // .nextUntil('flt-offset').click({force: true}).type('123456')
    // .parent('flt-offset').find('flt-offset').within(() => {
    //   cy.get('flt-offset').eq(1).click({force: true}).type('123456')
    // })

    return this;
  }
  // inputChangePassword() {
  //   cy.get("flt-glass-pane").click();
  //   cy.get("flt-glass-pane").shadow()
  //     .find('flt-span').contains('Current')
  //     .parents('flt-picture').siblings('flt-offset').eq(2).click({force: true})
  //   cy.get('input.flt-text-editing')
  //     .click().type('123456', {force: true})
  //     // .nextUntil('flt-offset').click({force: true}).type('123456')
  //     // .parent('flt-offset').find('flt-offset').within(() => {
  //     //   cy.get('flt-offset').eq(1).click({force: true}).type('123456')
  //     // })

  //   return this;
  // }
}