const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 90000,
  expect: {
    timeout: 15000,
  },
  retries: 1,
  workers: 3,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://blazedemo.com',
    channel: 'msedge',
    actionTimeout: 45000,
    navigationTimeout: 60000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'msedge', use: { ...devices['Desktop Edge'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
});
