import Modal from '.';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Elements|Modal',
  decorators: [withKnobs(), withA11y()]
};

export const Default = () => ({
  components: { Modal },
  props: {
    title: {
      default: text('Title', 'Settings')
    },
    body: {
      default: text('Body', 'Sample text')
    },
    show: {
      default: boolean('Show', false)
    }
  },
  methods: {
    closeModal: action('close-modal')
  },
  template: `<modal @close-modal="closeModal" :show="show">
              <template #header>{{ title }}</template>
              <template #default>{{ body }}</template>
            </modal>`
});
