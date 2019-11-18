/* eslint-disable no-unused-vars */
import StopInfo from '../StopInfo';
import { text, number } from '@storybook/addon-knobs';

export default {
  title: 'Patterns|StopInfo'
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
