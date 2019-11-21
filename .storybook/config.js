import { configure, addParameters } from '@storybook/vue';
import requireContext from 'require-context.macro';

import '../src/styles/storybook.css';

const customViewports = {
  iphone8: {
    name: 'iPhone 8',
    styles: {
      width: '375px',
      height: '667px'
    },
    type: 'mobile'
  },
  iphonex: {
    name: 'iPhone X/XS',
    styles: {
      width: '375px',
      height: '812px'
    },
    type: 'mobile'
  }
};

addParameters({
  viewport: {
    viewports: customViewports,
    defaultViewport: 'iphone8'
  },
  themes: [
    { name: 'light-mode', class: ['light-mode'], color: '#fff' },
    { name: 'dark-mode', class: ['dark-mode'], color: '#1C1C1E' }
  ]
});

// automatically import all files ending in *.stories.js
configure(requireContext('../src', true, /\.stories\.js$/), module);
