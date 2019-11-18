import StopDepartures from './';
import { array } from '@storybook/addon-knobs';

export default {
  title: 'Patterns|StopDepartures'
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
      default: array('departures', departures)
    }
  },
  template: `<stop-departures :departures="departures" />`
});
