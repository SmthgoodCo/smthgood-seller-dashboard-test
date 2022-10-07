const { defineConfig } = require("cypress");
const { rmdir } = require("fs");
module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "config/reporterOpts.json",
  },

  e2e: {
    baseUrl: "https://seller-smthgood.vinova.sg/",
    chromeWebSecurity: false,
    fixturesFolder: "cypress/fixtures",
    downloadsFolder: "cypress/downloads",
    screenshotsFolder: "cypress/reports/screenshots",
    videosFolder: "cypress/reports/videos",
    viewportWidth: 1900,
    viewportHeight: 1070,
    numTestsKeepInMemory: 1,
    supportFile: "support/e2e.js",
    specPattern: "e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: true,
    env: {
      login_url: "/login",
    },
    defaultCommandTimeout: 60000,
    setupNodeEvents(on, config) {},
  },
});
