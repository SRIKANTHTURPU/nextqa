Feature: Switching Company Functionality

  @PP-10662
  Scenario: Successful searching and switching companies
    Given I am on Homepage "https://dev.artemishealth.com/v3/home"
    When I switch to Company "Demo: Engineering"
    Then I should see the searched company "Demo: Engineering" in the company Bar
