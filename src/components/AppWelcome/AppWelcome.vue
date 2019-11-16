<template>
  <div class="app-welcome">
    <div class="app-welcome--icon">
      <app-icon />
    </div>
    <h1 class="app-welcome--title">Tramspotter</h1>
    <p class="app-welcome--info">
      Get live departures at your nearest Metrolink tram stop.
    </p>
  </div>
</template>

<script>
import AppIcon from '../../public/app-icon.svg';
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
  height: 100%;

  &--icon {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  &--title {
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
  }

  &--info {
    font-size: 1.125rem;
    text-align: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
