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
    },
    message: {
      default: text(
        'Message',
        'Due to an earlier signalling fault at Victoria we are currently experiencing delays to Metrolink Services. Please visit www.tfgm.com for up to date travel information.'
      )
    },
    lastUpdate: {
      default: text('Timestamp', 'less than a minute')
    }
  },
  template: `<app-journey
      :stop-location="location"
      :distance-to-stop="distance"
      :app-version="appVersion"
      :message="message"
      :last-update="lastUpdate" />`
});
