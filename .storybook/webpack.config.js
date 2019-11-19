const path = require('path');

module.exports = async ({ config, mode }) => {
  // filter out SVGs from being in conflict with webpack's file-loader
  config.module.rules = config.module.rules.map(rule => {
    if (
      String(rule.test) ===
      String(
        /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
      )
    ) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
      };
    }
    return rule;
  });

  config.module.rules.push({
    test: /\.postcss$/,
    use: ['vue-style-loader', 'css-loader', 'postcss-loader']
  });

  config.module.rules.push({
    test: /\.css$/,
    use: ['postcss-loader']
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: [{ loader: 'vue-svg-loader' }]
  });

  return config;
};
