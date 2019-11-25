<template>
  <transition name="fade">
    <div v-show="show" class="modal-backdrop">
      <transition name="slide">
        <div v-show="show" class="modal" @keyup.esc="$emit('close-modal')">
          <header class="modal--header">
            <slot name="header">Modal header</slot>
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
  animation-duration: 1s;
}

.modal {
  background-color: var(--app-bg);
  position: absolute;
  bottom: -2rem;
  left: 0;
  width: calc(100vw - 1rem);
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  animation-duration: 1.5s;
  padding-bottom: 2rem;

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0, 1.5);
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(0, 100px, 0);
}
</style>
