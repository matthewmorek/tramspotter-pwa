<template>
  <div id="app">
    <base-layout v-if="isEmpty(nearestStop)">
      <template #header>
        <app-welcome />
      </template>
    </base-layout>
  </div>
</template>

<script>
import AppWelcome from '../components/AppWelcome';
export default {
  components: {
    AppWelcome
  }
};
</script>

<style type="postcss"></style>
