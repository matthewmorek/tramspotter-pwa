<template>
  <footer class="app-footer">
    <div class="mb3">
      <button class="btn-cta" @click="$emit('init')">Find a tram stop</button>
    </div>
    <div class="app-footer--notice">
      <div class="app-footer--notice-icon">
        <LocationIcon />
      </div>
      <div class="app-footer--notice-text">
        A permission to access your device location is required.
      </div>
    </div>
  </footer>
</template>

<script>
import LocationIcon from '../public/location.svg';

export default {
  components: {
    LocationIcon
  }
};
</script>

<style lang="postcss">
.app-footer--notice {
  display: flex;
  align-items: center;

  &-text {
    font-size: 0.875rem;
    padding-left: 0.5rem;
  }
}
</style>
