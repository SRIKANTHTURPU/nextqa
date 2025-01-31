import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
require("dotenv").config();

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature", // Path to feature files
    supportFile: "cypress/support/e2e.ts",
    env: {
      ...process.env,
      stepDefinitions: "cypress/e2e/step-definitions/**/*.cy.{js,ts}",
    },
    // 👇 Define where Cypress should look for step definitions
    experimentalRunAllSpecs: true,
    // ✅ Override existing reports instead of generating new ones
    reporter: "mocha-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome, mocha-junit-reporter",
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports/mochawesome",
        overwrite: true, // 👈 Ensure reports are overridden
        html: true,
        json: true,
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: "cypress/reports/junit/results.xml", // 👈 Fixed to override instead of creating new files
        toConsole: true,
      },
    },

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
  },
});
