import Departures from '.';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { departuresFactory } from '../../__test__/__fixtures__/dataFactory';

export default {
  title: 'Patterns|Departures',
  decorators: [withKnobs(), withA11y()]
};

export const Default = () => ({
  components: { Departures },
  data: function() {
    return { departures: departuresFactory() };
  },
  props: {
    isLive: {
      default: boolean('Live', true)
    }
  },
  template: `<departures :departures="departures" :is-live="isLive" />`
});
