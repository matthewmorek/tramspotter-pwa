/* eslint-disable no-unused-vars */
import Departure from './Departure';

export default {
  title: 'Elements|Departure'
};
export const Due = () => ({
  components: { Departure },
  template:
    '<departure destination="Bury" carriages="1" wait="8" status="Due" />'
});
export const Departing = () => ({
  components: { Departure },
  template:
    '<departure destination="Piccadilly" carriages="1" wait="0" status="Departing" />'
});
export const Arrived = () => ({
  components: { Departure },
  template:
    '<departure destination="Manchester Airport" carriages="2" wait="0" status="Arrived" />'
});
