const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.server = {
  ...config.server,
  rewriteRequestUrl: (url) => {
    if (url.endsWith('.bundle')) {
      return url.replace('.bundle', '.js');
    }
    return url;
  },
};

module.exports = config;
