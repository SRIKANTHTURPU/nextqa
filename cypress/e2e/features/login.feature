Feature: Login Functionality

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username and password credentials
    And I click the login button
    Then I should be redirected to the Home dashboard
