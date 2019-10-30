import { configure } from '@storybook/vue';
import requireContext from 'require-context.macro';

import '../src/styles/storybook.css';

// automatically import all files ending in *.stories.js
configure(requireContext('../src', true, /\.stories\.js$/), module);
