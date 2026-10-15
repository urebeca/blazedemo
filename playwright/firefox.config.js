const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: 90000,
  expect: { timeout: 15000 },
  retries: 1,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://blazedemo.com',
    browserName: 'firefox',
  },
  projects: [
    { name: 'firefox', use: { channel: undefined } },
  ],
});