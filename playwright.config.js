const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  use: {
    browserName: 'chromium',
    headless: true,
  },
});
