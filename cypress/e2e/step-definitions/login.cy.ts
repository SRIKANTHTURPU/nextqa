import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../pages/loginpage";

const username = Cypress.env('USER_NAME');
const password = Cypress.env('USER_PASSWORD');

Given("I am on the login page", () => {
  LoginPage.actions.visit()
});

When("I enter valid username and password credentials", () => {  
  LoginPage.actions.enterCrdentials(username, password)
});

When("I click the login button", () => {
  LoginPage.actions.clickOnLoginButton()
  LoginPage.actions.waitUntilArtemisSpinnerNotExist()
});

Then("I should be redirected to the Home dashboard", () => {
  cy.url().should("include", "/home");
});
