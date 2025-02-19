import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../pages/homepage";

//PP-10662:Successful searching and switching companies
Given('I am on Homepage {string}', (Homepage:string) => {
    cy.visit(Homepage)
});

When('I switch to Company {string}', (company:string) => {
    homePage.actions.switchToCompany(company)
});

Then('I should see the searched company {string} in the company Bar', (company:string) => {
    homePage.companyDropdownBar().should('contain',company)
});

