<template>
  <main class="app-main">
    <AppIcon />
    <h1 class="app-title">Tramspotter</h1>
    <p class="app-description">
      Find your nearest Metrolink tram stop and check it for live departures.
    </p>
  </main>
</template>

<script>
import AppIcon from '../public/app-icon.svg';
export default {
  components: {
    AppIcon
  }
};
</script>

<style lang="scss">
.app-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-title {
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

.app-description {
  font-size: 1.125rem;
  text-align: center;
}
</style>
