const { defineConfig } = require("cypress");
const { rmdir } = require("fs");
module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    quite: true,
    overwrite: false,
    html: false,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    reportPageTitle: "Cypress Tests",
  },

  e2e: {
    baseUrl: "https://seller-smthgood.vinova.sg/",
    chromeWebSecurity: false,
    fixturesFolder: "cypress/fixtures",
    downloadsFolder: "cypress/downloads",
    screenshotsFolder: "output/e2e/screenshots",
    videosFolder: "output/e2e/videos",
    viewportWidth: 1900,
    viewportHeight: 1070,
    numTestsKeepInMemory: 1,
    supportFile: "support/e2e.js",
    specPattern: "e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
    env: {
      login_url: "/login",
      EMAIL: "baoquoc@smthgoodco.com",
      PASSWORD: "iRDb0vno",
    },
    defaultCommandTimeout: 60000,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      on("task", {
        deleteFolder(folderName) {
          console.log("deleting folder %s", folderName);

          return new Promise((resolve, reject) => {
            rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
              if (err) {
                console.error(err);
                return reject(err);
              }
              resolve(null);
            });
          });
        },
      });
    },
  },
});
