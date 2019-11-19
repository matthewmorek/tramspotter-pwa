import Departure from './';

export default {
  title: 'Elements|Departure'
};
export const Due = () => ({
  components: { Departure },
  template:
    '<departure :destination="Bury" :carriages="Single" :wait="8" :status="Due" :id="1" />'
});
export const Departing = () => ({
  components: { Departure },
  template:
    '<departure :destination="Piccadilly" :carriages="Single" :wait="0" :status="Departing" :id="1" />'
});
export const Arrived = () => ({
  components: { Departure },
  template:
    '<departure :destination="Manchester Airport" :carriages="Double" :wait="0" :status="Arrived" :id="1" />'
});
