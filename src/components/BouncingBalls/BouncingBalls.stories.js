/* eslint-disable no-unused-vars */
import Vue from 'vue';
import BouncingBalls from './BouncingBalls';

export default {
  title: 'BouncingBalls'
};

export const standard = () => ({
  components: { BouncingBalls },
  template: '<bouncing-balls />'
});
