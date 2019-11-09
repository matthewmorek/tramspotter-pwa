<template>
  <header class="app-header">
    <div>
      <app-icon class="app-icon" />
    </div>
    <div>
      <h2 class="app-header--stop-name">{{ stopLocation }}</h2>
      <p class="app-header--stop-distance">{{ distanceToStop }} mls away</p>
    </div>
  </header>
</template>

<script>
import AppIcon from '../public/app-icon.svg';

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
.app-header {
  display: flex;
  align-items: center;
}
.app-header--stop-name {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
}
.app-header--stop-distance {
  font-size: 0.875rem;
  font-weight: 400;
}
</style>
