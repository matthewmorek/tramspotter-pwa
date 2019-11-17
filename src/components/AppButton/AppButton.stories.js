/* eslint-disable no-unused-vars */
import AppButton from '../AppButton';

export default {
  title: 'Elements|AppButton'
};

export const standard = () => ({
  components: { AppButton },
  template: '<app-button>App button</app-button>'
});

export const isLoading = () => ({
  components: { AppButton },
  template: '<app-button :is-loading="true">App button</app-button>'
});

export const withAction = () => ({
  components: { AppButton },
  template: '<app-button @click="() => false">App button</app-button>'
});
