const base = require('./playwright.config.js');

module.exports = {
  ...base,
  projects: [
    { name: 'chrome', use: { ...base.projects[0].use, channel: 'chrome' } },
  ],
};