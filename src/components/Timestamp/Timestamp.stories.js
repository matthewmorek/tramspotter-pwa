import Timestamp from '.';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'Elements|UpdateTimestamp',
  decorators: [withKnobs(), withA11y()]
};

export const Default = () => ({
  components: { Timestamp },
  props: {
    lastUpdate: {
      default: text('Timestamp', 'less than a minute')
    }
  },
  template: '<timestamp :last-update="lastUpdate" />'
});
