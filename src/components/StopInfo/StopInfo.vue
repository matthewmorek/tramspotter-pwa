<template>
  <header class="stop-info">
    <div>
      <app-icon />
    </div>
    <div>
      <h2 class="stop-info--name">{{ stopLocation }}</h2>
      <p class="stop-info--distance">{{ distanceToStop }} mls away</p>
    </div>
  </header>
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
}

.stop-info--name {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
}

.stop-info--distance {
  font-size: 0.875rem;
  font-weight: 400;
}
</style>
