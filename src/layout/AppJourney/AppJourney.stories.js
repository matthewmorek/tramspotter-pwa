/* eslint-disable no-unused-vars */
import AppJourney from '.';
import { version } from '../../../package.json';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'Templates|AppJourney',
  decorators: [withKnobs(), withA11y()]
};

export const Default = () => ({
  components: { AppJourney },
  props: {
    location: {
      default: text('Location', 'Deansgate-Castlefield')
    },
    distance: {
      default: number('Distance', 0.5)
    },
    appVersion: {
      default: text('Version', version)
    }
  },
  template:
    '<app-journey :stop-location="location" :distance-to-stop="distance" :appVersion="appVersion" />'
});
