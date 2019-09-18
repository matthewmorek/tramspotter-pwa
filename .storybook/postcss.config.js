module.exports = {
  plugins: {
    'postcss-import': {},
    precss: {
      'postcss-preset-env': {
        stage: 1,
        preserve: true
      }
    },
    autoprefixer: {}
  }
};
