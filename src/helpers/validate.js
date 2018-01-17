const defaultConfig = require('./default-config');

module.exports = config => {
  if (!config) {
    return defaultConfig;
  }

  config.url = (typeof config.url === 'object') ? config.url : defaultConfig.url;
  config.timeout = (typeof config.timeout === 'number') ? config.timeout : defaultConfig.timeout;
  config.SLACK_WEBHOOK_URL = (typeof config.SLACK_WEBHOOK_URL === 'string') ? config.SLACK_WEBHOOK_URL : defaultConfig.SLACK_WEBHOOK_URL;

  return config;
};