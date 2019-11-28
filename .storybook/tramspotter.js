import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  fontBase:
    '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Tramspotter Storybook',
  brandUrl: 'https://storybook.tramspotter.com',
  brandImage: '/img/storybook-brand@2x.png'
});
