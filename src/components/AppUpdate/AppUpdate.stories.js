import AppUpdate from '.';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Elements|AppUpdate',
  decorators: [withKnobs(), withA11y()]
};

export const standard = () => ({
  components: { AppUpdate },
  props: {
    message: {
      default: text('Message', 'New update available. Tap to upgrade.')
    }
  },
  methods: {
    updateApp: action('button-click')
  },
  template:
    '<app-update :update-app="updateApp" :update-exists="true">{{ message }}</app-update>'
});
