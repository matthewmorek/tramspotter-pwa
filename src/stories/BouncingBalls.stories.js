// import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import BouncingBalls from '../components/BouncingBalls';

storiesOf('Elements|BouncingBalls', module).add('default', () => ({
  components: { BouncingBalls },
  template: '<bouncing-balls />'
}));
