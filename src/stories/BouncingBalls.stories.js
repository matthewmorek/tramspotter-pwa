/* eslint-disable no-unused-vars */
import Vue from 'vue';
import BouncingBalls from '../components/BouncingBalls';

export default {
  title: 'BouncingBalls'
};

export const text = () => ({
  components: { BouncingBalls },
  template: '<bouncing-balls></bouncing-balls>'
});

export const jsx = () => ({
  components: { BouncingBalls },
  render(h) {
    return <bouncing-balls />;
  }
});

export const emoji = () => ({
  components: { BouncingBalls },
  template: '<bouncing-balls></bouncing-balls>'
});
