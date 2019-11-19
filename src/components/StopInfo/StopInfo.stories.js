import StopInfo from '../StopInfo';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'Patterns|StopInfo',
  decorators: [withKnobs(), withA11y()]
};

export const standard = () => ({
  components: { StopInfo },
  props: {
    location: {
      default: text('Location', 'Deansgate-Castlefield')
    },
    distance: {
      default: number('Distance', 0.5)
    }
  },
  template:
    '<stop-info :stop-location="location" :distance-to-stop="distance" />'
});
