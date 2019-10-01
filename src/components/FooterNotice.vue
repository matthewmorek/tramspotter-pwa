<template>
  <div class="app-footer--notice">
    <div class="app-footer--notice-icon">
      <slot name="icon"></slot>
    </div>
    <div class="app-footer--notice-text">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss">
.app-footer--notice {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;

  &-text {
    font-size: 0.875rem;
    padding-left: 0.75rem;
  }

  &--icon {
    .icon {
      fill: var(--icon-contrast);
    }
  }
}
</style>
