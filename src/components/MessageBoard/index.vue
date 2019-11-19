<template>
  <div v-if="message" class="message-board">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>

<style lang="postcss">
.message-board {
  font-size: 0.875rem;
  color: var(--notice-color-text);
  background-color: var(--notice-color-bg);
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}
</style>
