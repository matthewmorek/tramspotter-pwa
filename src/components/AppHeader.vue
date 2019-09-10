<template>
  <header class="app-header">
    <div>
      <AppIcon class="app-icon" />
    </div>
    <div>
      <h2 class="app-header--name">{{ stopLocation }}</h2>
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
      required: true
    }
  }
};
</script>

<style lang="postcss">
.app-header {
  display: flex;
  align-items: center;
}
.app-header--name {
  font-size: 1.25rem;
  font-weight: 700;
}
</style>
