<template>
  <div v-if="updateExists" class="snackbar" @click="$emit('update-app')">
    <slot>New update available. Tap to upgrade.</slot>
  </div>
</template>

<script>
export default {
  props: {
    updateExists: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="postcss">
.snackbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--pill-color-bg--due);
  color: var(--pill-color-text--due);
  text-align: center;
  font-size: var(--text-size-sm);
  font-weight: 500;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 -1px 3px;
  cursor: default;
}
</style>
