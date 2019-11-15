/* eslint-disable no-unused-vars */
import WelcomeScreen from './WelcomeScreen';

export default {
  title: 'Views'
};

export const Welcome = () => ({
  components: { WelcomeScreen },
  template: '<welcome-screen />'
});
