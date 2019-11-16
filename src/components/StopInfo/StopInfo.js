/* eslint-disable no-unused-vars */
import AppHeader from './AppHeader';

export default {
  title: 'Patterns|AppHeader'
};

export const standard = () => ({
  components: { AppHeader },
  template: '<app-header :stopLocation="Timperley" :distanceToStop="0.5" />'
});
