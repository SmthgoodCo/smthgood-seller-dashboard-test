const { defineConfig } = require("cypress");
const { rmdir } = require("fs");
const del = require("del");

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
    screenshotsFolder: "reports/screenshots",
    videosFolder: "reports/videos",
    viewportWidth: 1900,
    viewportHeight: 1070,
    videoCompression: 40,
    numTestsKeepInMemory: 1,
    supportFile: "support/e2e.js",
    specPattern: "e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: true,
    env: {
      login_url: "/login",
    },
    defaultCommandTimeout: 60000,
    setupNodeEvents(on, config) {
      on("after:spec", (spec, results) => {
        if (results && results.stats.failures === 0 && results.video) {
          // `del()` returns a promise, so it's important to return it to ensure
          // deleting the video is finished before moving on
          return del(results.video);
        }
      });
    },
  },
});
