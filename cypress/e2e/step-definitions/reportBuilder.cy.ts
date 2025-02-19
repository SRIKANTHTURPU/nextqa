
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../pages/homepage";
import { reportBuilderPage } from "../pages/reportBuilderpage";

//PP-10665:Successful drag and drop of components
Given('I am on Homepage {string} and switch to Company {string}', (Homepage:string,company:string) => {    
    cy.visit(Homepage)
    homePage.actions.loginToHomeDashboard()
    homePage.actions.switchToCompany(company)
});

When('I click on leftMenu {string} and switch to component {string}', (leftMenu: string,component: string) => {
    homePage.actions.switchToComponent(leftMenu,component)
});

When('I drag the required element and drop it under required Metric Tab', () => {
    reportBuilderPage.actions.dragAndDropOfComponent()
});

Then('I should able to see the dragged element in dropped location', () => {
    cy.get(".table-cell.css-1ryfbl6").contains("Filters").parent().parent().next().should('contain',"Suggested metric 1")
});


