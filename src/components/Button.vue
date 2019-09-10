<template>
  <button class="btn-cta">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="postcss">
.btn-cta {
  appearance: none;
  background: var(--btn-color-bg);
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
</style>
