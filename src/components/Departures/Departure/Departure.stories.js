import Departure from '.';
import { withKnobs, text, number, select } from '@storybook/addon-knobs';

export default {
  title: 'Elements|Departure',
  parameters: [withKnobs()]
};
export const Default = () => ({
  components: { Departure },
  data: () => ({
    id: 'some-fancy-string'
  }),
  props: {
    destination: {
      default: text('Destination', 'Bury')
    },
    carriage: {
      default: select('Carriage', ['Single', 'Double'], 'Single')
    },
    wait: {
      default: number('Wait', 8)
    },
    status: {
      default: select('Status', ['Due', 'Departing', 'Arrived'], 'Due')
    }
  },
  template:
    '<departure :destination="destination" :carriages="carriage" :wait="wait" :status="status" :id="id" />'
});
