<template>
  <div class="app-about">
    <div>Made in MCR 🐝</div>
    <button class="btn-about" @click="$emit('show-modal')">
      <info-icon width="32" height="32" class="icon" />
    </button>
  </div>
</template>

<script>
import InfoIcon from '../../public/info-icon.svg';
export default {
  components: {
    InfoIcon
  }
};
</script>

<style lang="postcss">
.app-about {
  text-align: center;
  padding-top: 1rem;
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color-dimmed);
  margin-bottom: 1.5rem;

  .btn-about {
    display: block;
    padding: 0;
    background-color: var(--pill-color-bg);
    border-radius: 64px;

    .icon {
      display: block;
      fill: var(--text-color-dimmed);
    }
  }
}
</style>
