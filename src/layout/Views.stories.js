/* eslint-disable no-unused-vars */
import WelcomeScreen from './WelcomeScreen';

export default {
  title: 'Views|States'
};

export const Welcome = () => ({
  components: { WelcomeScreen },
  template: '<welcome-screen />'
});
