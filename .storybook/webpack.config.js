const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.postcss$/,
    use: ['vue-style-loader', 'css-loader', 'postcss-loader']
  });

  config.module.rules.push({
    test: /\.css$/,
    use: ['postcss-loader']
  });

  return config;
};
