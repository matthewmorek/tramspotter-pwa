/* eslint-disable no-unused-vars */
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import AppButton from '../components/AppButton';

export default {
  title: 'AppButton'
};

export const text = () => ({
  components: { AppButton },
  template: '<app-button @click="action">Hello Button</app-button>',
  methods: { action: action('clicked') }
});

export const jsx = () => ({
  components: { AppButton },
  render(h) {
    return <app-button onClick={this.action}>With JSX</app-button>;
  },
  methods: { action: linkTo('clicked') }
});

export const emoji = () => ({
  components: { AppButton },
  template: '<app-button @click="action">😀 😎 👍 💯</app-button>',
  methods: { action: action('clicked') }
});
