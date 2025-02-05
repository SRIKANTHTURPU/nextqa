import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { defineConfig } from "cypress";
import fix from "cypress-on-fix";
import { configureXrayPlugin, syncFeatureFile } from "cypress-xray-plugin";
require("dotenv").config();

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature", // Path to feature files
    supportFile: "cypress/support/e2e.ts",
    env: {
      ...process.env,
      stepDefinitions: "cypress/e2e/step-definitions/**/*.cy.{js,ts}",
    },
    // Define where Cypress should look for step definitions
    experimentalRunAllSpecs: true,
    // ✅ Override existing reports instead of generating new ones
    reporter: "mocha-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome, mocha-junit-reporter",
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports/mochawesome",
        overwrite: true, // Ensure reports are overridden
        html: true,
        json: true,
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: "cypress/reports/junit/results.xml", // Fixed to override instead of creating new files
        toConsole: true,
      },
    },
    async setupNodeEvents(on, config) {
      const fixedOn = fix(on);
      await addCucumberPreprocessorPlugin(fixedOn, config);
      await configureXrayPlugin(fixedOn, config, {
        jira: {
          projectKey: "PP",
          url: "https://artemishealth.atlassian.net/",
        },
        xray: {
          status: {
            step: {
              skipped: "SKIPPED",
            },
          },
          uploadResults: true,
        },
        cucumber: {
          featureFileExtension: ".feature",
          prefixes: {
            test: undefined,
          },
        },
      });
      fixedOn("file:preprocessor", async (file) => {
        await syncFeatureFile(file);
        const cucumberPlugin = createBundler({
          plugins: [createEsbuildPlugin(config)],
        });
        return cucumberPlugin(file);
      });

      return config;
    },
  },
});
