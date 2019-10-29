import { configure } from '@storybook/vue';

import '../src/styles/global.css';

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
