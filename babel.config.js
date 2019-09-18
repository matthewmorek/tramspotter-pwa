module.exports = {
  plugins: ['@babel/plugin-transform-runtime', 'macros'],
  presets: [
    // '@vue/app',
    ['@babel/preset-env', { targets: { node: true } }]
  ]
};
