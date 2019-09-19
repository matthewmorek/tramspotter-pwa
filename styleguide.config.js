const path = require('path');

module.exports = {
  title: 'Tramspotter Style Guide',
  defaultExample: true,
  require: [path.join(__dirname, 'src/styles/global.css')],
  sections: [
    {
      name: 'Components',
      components: 'src/components/*.vue'
    }
  ]
};
