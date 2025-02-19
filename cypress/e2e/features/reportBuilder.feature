Feature: Switching Company Functionality

  @PP-10665
  Scenario: Successful drag and drop of components
    Given I am on Homepage "https://dev.artemishealth.com/v3/home" and switch to Company "Demo: Engineering"
    When I click on leftMenu "New" and switch to component "Report"
    And I drag the required element and drop it under required Metric Tab
    Then I should able to see the dragged element in dropped location