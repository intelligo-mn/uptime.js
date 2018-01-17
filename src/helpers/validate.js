const defaultConfig = require('./default-config');

module.exports = config => {
  if (!config) {
    return defaultConfig;
  }

  config.websites = (typeof config.websites === 'object') ? config.websites : defaultConfig.websites;

  return config;
};