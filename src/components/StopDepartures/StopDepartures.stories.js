import StopDepartures from './';
import { withKnobs, array, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'Patterns|StopDepartures',
  decorators: [withKnobs(), withA11y()]
};

const departures = [
  {
    id: 1,
    destination: 'Picadilly',
    carriages: 'Single',
    wait: 0,
    status: 'Arriving'
  },
  {
    id: 2,
    destination: 'Bury',
    carriages: 'Double',
    wait: 4,
    status: 'Due'
  },
  {
    id: 3,
    destination: 'Bury',
    carriages: 'Single',
    wait: 6,
    status: 'Due'
  },
  {
    id: 4,
    destination: 'Picadilly',
    carriages: 'Double',
    wait: 8,
    status: 'Due'
  }
];
export const Timetable = () => ({
  components: { StopDepartures },
  props: {
    departures: {
      default: array('Departures', departures)
    },
    isLive: {
      default: boolean('Live', true)
    }
  },
  template: `<stop-departures :departures="departures" :is-live="isLive" />`
});
