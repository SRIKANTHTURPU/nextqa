export const baseURL = Cypress.env('BASE_URL').replace(/\/+$/, '');
export const LoginPage = {
  login_userName: () => cy.get('[data-qa="username"]'),
  login_password: () => cy.get("#password"),
  login_btnSubmit: () => cy.get('[data-qa="login-submit"]'),
  login_submitButtonLoadingIcon: () =>  cy.get('[data-qa="login-submit"] i.icon-spin'),
  login_error: () => cy.get('[data-qa="login-error"]'),
  login_fastbootspinner: () => cy.get("#fastboot"),
  spinner_FastbootImg: () => cy.get('.fastboot > img', { timeout: 60000 }),
  spinner_LoadingTextMsg: () => cy.get('[data-qa="app-loading-card-msg"]', { timeout: 60000 }),
  breadcrumb: () => cy.get('[data-qa="entity-breadcrumb"]'),

  actions: {
    visit: () => cy.visit(`${baseURL}/auth/login`),
    enterCrdentials: (vUsername: string, vPassword: string) => {
      LoginPage.login_userName().clear().type(vUsername);
      LoginPage.login_btnSubmit().click();
      LoginPage.login_password().clear().type(vPassword, { log: false });      
    },
    clickOnLoginButton: () => {
      LoginPage.login_btnSubmit().click().wait(2000);
      cy.log("user signin application successfully");
    },
    waitUntilArtemisSpinnerNotExist: () => {
      LoginPage.spinner_FastbootImg().should('not.exist').then(() => {
        LoginPage.spinner_LoadingTextMsg().should('not.exist');
        LoginPage.breadcrumb().should('exist').should('be.visible')
      });
    }
  },
};
