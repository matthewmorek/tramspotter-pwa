/* eslint-disable no-unused-vars */
import StopInfo from '../StopInfo';

export default {
  title: 'Patterns|StopInfo'
};

export const standard = () => ({
  components: { StopInfo },
  template:
    '<stop-info stop-location="Deansgate-Castlefield" distance-to-stop="0.5" />'
});
