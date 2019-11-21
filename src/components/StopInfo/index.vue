<template>
  <div class="stop-info">
    <div class="stop-info--icon">
      <app-icon width="52" height="52" />
    </div>
    <div>
      <h2 class="stop-info--name">{{ stopLocation }}</h2>
      <p class="stop-info--distance">{{ distanceToStop }} mls away</p>
    </div>
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
      required: true,
      default: null
    },
    distanceToStop: {
      type: Number,
      required: true,
      default: null
    }
  }
};
</script>

<style lang="postcss">
.stop-info {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

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
  }
}
</style>
