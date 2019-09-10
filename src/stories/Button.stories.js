// import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import Button from '../components/Button';

storiesOf('Components/Button', module).add('default', () => ({
  components: { Button },
  template: '<button class="btn-cta">Update</my-button>'
}));
