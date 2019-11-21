import AppJourney from '.';
import { version } from '../../../package.json';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { departuresFactory } from '../../__test__/__fixtures__/dataFactory';

export default {
  title: 'Templates|AppJourney',
  decorators: [withKnobs(), withA11y()]
};

export const Default = () => ({
  components: { AppJourney },
  data: function() {
    return { departures: departuresFactory() };
  },
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
      :last-update="lastUpdate"
      :departures="departures" />`
});

export const Empty = () => ({
  components: { AppJourney },
  data: function() {
    return {
      location: 'Deansgate-Castlefield',
      distance: 0.5,
      appVersion: version,
      message: null,
      lastUpdate: 'less than a minute ago'
    };
  },
  template: `<app-journey
      :stop-location="location"
      :distance-to-stop="distance"
      :app-version="appVersion"
      :message="message"
      :last-update="lastUpdate" />`
});
