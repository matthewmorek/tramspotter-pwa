<template>
  <main class="app-welcome">
    <app-icon />
    <h1 class="app-welcome--title">Tramspotter</h1>
    <p class="app-welcome--info">
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

<style lang="postcss">
.app-welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-welcome--title {
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

.app-welcome--info {
  font-size: 1.125rem;
  text-align: center;
}
</style>
