import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
require('dotenv').config();

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature", // Path to feature files
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents: async (on, config) => {
      // Add Cucumber Preprocessor Plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Set up Esbuild for preprocessing
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config; // Return updated config
    },
    // 👇 Define where Cypress should look for step definitions
    experimentalRunAllSpecs: true,
    env: {
      ...process.env,
      stepDefinitions: "cypress/e2e/step-definitions/**/*.cy.{js,ts}",
    },
  },
});
