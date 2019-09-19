// import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import Button from '../components/Button';

storiesOf('Elements|Button', module)
  .add('default', () => ({
    components: { Button },
    template: '<Button>Update</Button>'
  }))
  .add('loading', () => ({
    components: { Button },
    template: '<Button :isLoading="true">Update</Button>'
  }));
