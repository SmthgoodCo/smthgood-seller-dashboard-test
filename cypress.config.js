const { defineConfig } = require("cypress");
const { rmdir } = require("fs");
const del = require("del");
const path = require("path");
const gmail_tester = require("gmail-tester");
const { resolve } = require("path");
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
    viewportWidth: 1024,
    viewportHeight: 800,
    videoCompression: 38,
    numTestsKeepInMemory: 1,
    supportFile: "support/e2e.js",
    specPattern: "e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: true,
    env: {
      login_url: "/login",
    },
    includeShadowDom: true,
    // watchForFileChanges: false,
    defaultCommandTimeout: 60000,
    setupNodeEvents(on, config) {
      on("task", {
        "gmail:get-messages": async args => {
          const messages = await gmail_tester.get_messages(
            path.resolve("plugins/", "credentials.json"),
            path.resolve("plugins/", "gmail_token.json"),
            args.options
          );
          return messages;
        },
        "gmail:check-inbox": async args => {
          const messages = await gmail_tester.check_inbox(
            path.resolve("plugins/", "credentials.json"),
            path.resolve("plugins/", "gmail_token.json"),
            args.options
          );
          return messages;
        },
        deleteDownloads() {
          return new Promise((resolve) => {
            rmdir('cypress/downloads', { recursive: true }, () => {
              resolve(null)
            })
          })
        }
      });
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
