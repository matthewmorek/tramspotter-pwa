import MessageBoard from '.';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'Elements|MessageBoard',
  decorators: [withKnobs(), withA11y()]
};

export const Default = () => ({
  components: { MessageBoard },
  props: {
    message: {
      default: text('Message', 'Surfaces may be icy - please take extra care')
    }
  },
  template: '<message-board :message="message" />'
});
