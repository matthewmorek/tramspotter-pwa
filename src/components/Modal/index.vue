<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal--header">
        <slot name="header">Modal header</slot>
        <button class="btn-close-modal" @click="$emit('close-modal')">
          <close-icon width="27" height="27" class="icon" />
        </button>
      </header>
      <div class="modal--body">
        <slot name="default">This is a modal content</slot>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '../../public/close-icon.svg';
export default {
  components: {
    CloseIcon
  },
  props: {
    closeModal: {
      type: Function,
      required: true
    }
  }
};
</script>

<style lang="postcss">
.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--app-bg-blur);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.modal {
  background-color: var(--app-bg);
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100vw - 1rem);
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  &--header {
    display: flex;
    line-height: 25px;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--header-color-border);
    font-weight: 600;

    .btn-close-modal {
      .icon {
        display: block;
        fill: var(--icon-contrast);
      }
    }
  }

  &--body {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
</style>
