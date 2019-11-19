import AppButton from '../AppButton';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Elements|AppButton',
  decorators: [withKnobs(), withA11y()]
};

export const standard = () => ({
  components: { AppButton },
  props: {
    label: {
      default: text('Label', 'Button label')
    },

    isLoading: {
      default: boolean('isLoading', false)
    }
  },
  methods: {
    onClick: action('button-click')
  },
  template:
    '<app-button :is-loading="isLoading" :btn-click="onClick" :btn-label="label">{{ label }}</app-button>'
});
