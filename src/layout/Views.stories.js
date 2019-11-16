/* eslint-disable no-unused-vars */
import WelcomeScreen from './WelcomeScreen';

export default {
  title: 'Templates|Welcome'
};

export const Standard = () => ({
  components: { WelcomeScreen },
  template: '<welcome-screen />'
});
