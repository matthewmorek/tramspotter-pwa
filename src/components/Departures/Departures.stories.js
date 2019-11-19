import Departures from '.';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'Patterns|Departures',
  decorators: [withKnobs(), withA11y()]
};

const myDepartures = [
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
export const Default = () => ({
  components: { Departures },
  data: function() {
    return { departures: myDepartures };
  },
  props: {
    isLive: {
      default: boolean('Live', true)
    }
  },
  template: `<departures :departures="departures" :is-live="isLive" />`
});
