<template>
  <transition name="fade">
    <div v-show="show" class="modal-backdrop">
      <transition name="slide">
        <div v-show="show" class="modal" @keyup.esc="$emit('close-modal')">
          <header class="modal--header">
            <span>
              <slot name="header">Modal header</slot>
            </span>
            <button class="btn-close-modal" @click="$emit('close-modal')">
              <close-icon width="27" height="27" class="icon" />
            </button>
          </header>
          <div class="modal--body" :class="bodyClass">
            <slot name="default">This is a modal content</slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import CloseIcon from '../../public/close-icon.svg';
export default {
  components: {
    CloseIcon
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    bodyClass: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>

<style lang="postcss">
.modal-backdrop {
  position: fixed;
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
  bottom: -4rem;
  left: 0;
  right: 0;
  width: calc(100vw - 1rem);
  border: 1px solid var(--header-color-border);
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-bottom: 4rem;
  max-width: 28em;
  margin: 0 auto;

  &--header {
    display: flex;
    line-height: 25px;
    justify-content: space-between;
    align-items: center;
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
    padding-bottom: 2rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
</style>
