module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.svg$': '<rootDir>/.storybook/svg-transform.js',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))'],
  moduleFileExtensions: ['vue', 'js', 'jsx', 'json', 'node']
};
