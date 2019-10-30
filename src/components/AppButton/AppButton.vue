<template>
  <button
    :disabled="isLoading"
    :class="['btn-cta', { 'btn-flat': isLoading }]"
    @click="onClick"
  >
    <bouncing-balls v-if="isLoading" />
    <slot v-else></slot>
  </button>
</template>

<script>
import BouncingBalls from '../BouncingBalls/BouncingBalls';
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
    },
    onClick: {
      type: Function,
      required: false,
      default: () => false
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
}
.btn-cta:active {
  box-shadow: none;
}

.btn-cta:disabled {
  background: var(--btn-color-bg--disabled);
  border-color: var(--btn-color-border--disabled);
  box-shadow: none;
  color: var(--btn-color-text--disabled);
}

.btn-flat > .double-bounce1,
.btn-cta > .double-bounce2 {
  background-color: var(--color-blue);
}
</style>
