export const homePage = {
  login_Button: () => cy.get("#root .MuiButtonBase-root"),
  profile_Icon: () => cy.get("[data-testid='PersonIcon']"),
  profile_Button: () => cy.get(".MuiButtonBase-root.MuiListItemButton-root.MuiListItemButton-gutters").contains("Profile"),
  logOut_Button: () => cy.get(".MuiButtonBase-root.MuiListItemButton-root.MuiListItemButton-gutters").contains("Log Out"),
  companyDropdownButton: () => cy.get("[data-testid='company-menu-arrow-trigger']"),
  companyDropdownBar: () => cy.get("[data-testid='current-company-name']"),
  companySearchBar: () => cy.get("input[placeholder='Search...']"),
  companySelectBar: (company: string) => cy.get("[data-testid='company-menu-options']").contains(company),
  switchToLegacy_Toggle_Button: () => cy.get(".MuiToggleButton-root"),
  notification_Button: () => cy.get("[data-testid='NotificationsIcon']"),
  leftMenu_In_Homepage: (leftMenu: any) => cy.get(".drawer-button").contains(leftMenu),
  leftMenu_ModalWindow_In_Homepage: () => cy.get(".popover-box"),

  actions: {
    loginToHomeDashboard:() => {
      homePage.login_Button().click()
    },
    switchToCompany: (company: string) => {
      homePage.companyDropdownButton().click()
      homePage.companySearchBar().click().type(company)
      homePage.companySelectBar(company).contains(company).click({ force: true })
    },
    switchToComponent: (leftMenu: string, component: string) => {
      homePage.leftMenu_In_Homepage(leftMenu).click()
      homePage.leftMenu_ModalWindow_In_Homepage().within(() => {
        homePage.leftMenu_In_Homepage(component).click()
      })
    },
  },
};
