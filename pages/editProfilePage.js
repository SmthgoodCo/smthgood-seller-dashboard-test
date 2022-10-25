// export class EditProfilePage {
//     constructor() {
//         this.fltGlassPane = 'flt-glass-pane';
//         this.fltSceneHost = 'flt-paragraph';
//         this.userNanmeTxt = 'Username';
//     }

//     verifyUsername() {
//         cy.get('flt-glass-pane')
//             .shadow()
//             .find('flt-scene-host')
//             // .contains('Username')
//             // .find('flt-scene>flt-transform>flt-offset>flt-clip>flt-clip-interior>flt-offset>flt-picture>flt-canvas>flt-paragraph>flt-span')
//             .find('flt-scene')
//             .find('flt-transform')
//             .find('flt-offset')//...
//             .find('flt-clip')
//             .find('flt-clip-interior')
//             .find('flt-offset')//..
//             .find('flt-picture')
//             .find('flt-canvas')
//             .find('flt-paragraph')
//             .find('flt-span')
//             .eq(0)
//             .contains('automationsmtgood')
//             .should('be.visible');
//     }
// }