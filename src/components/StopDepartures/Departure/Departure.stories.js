/* eslint-disable no-unused-vars */
import Departure from './';

export default {
  title: 'Elements|Departure'
};
export const Due = () => ({
  components: { Departure },
  template:
    '<departure destination="Bury" carriages="Single" wait="8" status="Due" />'
});
export const Departing = () => ({
  components: { Departure },
  template:
    '<departure destination="Piccadilly" carriages="Single" wait="0" status="Departing" />'
});
export const Arrived = () => ({
  components: { Departure },
  template:
    '<departure destination="Manchester Airport" carriages="Double" wait="0" status="Arrived" />'
});
