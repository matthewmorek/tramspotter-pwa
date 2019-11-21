<template>
  <div class="app-notice">
    <div class="app-notice--icon">
      <slot name="icon"></slot>
    </div>
    <div class="app-notice--text">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss">
.app-notice {
  display: flex;
  align-items: center;

  &--text {
    font-size: 0.875rem;
    padding-left: 0.75rem;
    color: var(--text-color-dimmed);
  }

  &--icon {
    .icon {
      fill: var(--text-color-dimmed);
    }
  }
}
</style>
