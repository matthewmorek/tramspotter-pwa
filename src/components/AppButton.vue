<template>
  <app-button
    :disabled="isLoading"
    :class="['btn-cta', { 'btn-flat': isLoading }]"
  >
    <bouncing-balls v-if="isLoading" />
    <!-- @slot label -->
    <slot v-else></slot>
  </app-button>
</template>

<script>
import BouncingBalls from './BouncingBalls';
export default {
  name: 'AppButton',
  components: {
    BouncingBalls
  },
  props: {
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="postcss">
.btn-cta {
  appearance: none;
  background-color: var(--btn-color-bg);
  border: 1px solid var(--btn-color-border);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4rem;
  color: var(--btn-color-text);
  font-size: 1.125rem;
  font-weight: 500;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-family: var(--font-family);
  width: 100%;
  height: 3.125rem;

  &:active {
    box-shadow: none;
  }

  &:disabled {
    background: var(--btn-color-bg--disabled);
    border-color: var(--btn-color-border--disabled);
    box-shadow: none;
    color: var(--btn-color-text--disabled);
  }
}

.btn-flat {
  .double-bounce1,
  .double-bounce2 {
    background-color: var(--color-blue);
  }
}
</style>
