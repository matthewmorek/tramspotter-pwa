<template>
  <div class="stop-info">
    <div class="stop-info--container">
      <div class="stop-info--icon">
        <app-icon width="52" height="52" />
      </div>
      <div>
        <h2 class="stop-info--name">{{ stopLocation }}</h2>
        <p class="stop-info--distance">{{ distanceToStop }} mls away</p>
      </div>
    </div>
    <div class="stop-info--bg"></div>
  </div>
</template>

<script>
import AppIcon from '../../public/app-icon.svg';

export default {
  components: {
    AppIcon
  },
  props: {
    stopLocation: {
      type: String,
      required: true
    },
    distanceToStop: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="postcss">
.stop-info {
  position: sticky;
  top: 0;
  left: 0;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &--bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--app-bg-blur);
    --webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: 0;
  }

  &--container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
  }

  &--icon {
    margin-right: 0.25rem;
  }

  &--name {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.2;
  }

  &--distance {
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--text-color-dimmed);
  }
}
</style>
