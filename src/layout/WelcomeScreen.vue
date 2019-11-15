<template>
  <base-layout>
    <template #default>
      <app-welcome />
    </template>
    <template #footer>
      <div class="app-footer--cta">
        <app-button @click="() => false">Find a tram stop</app-button>
      </div>
      <footer-notice>
        <template #icon>
          <location-icon class="app-footer-icon" />
        </template>
        <template #text>
          A permission to access your device location is required.
        </template>
      </footer-notice>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from './BaseLayout';
import LocationIcon from '../public/location.svg';
import AppWelcome from '../components/AppWelcome/AppWelcome';
import FooterNotice from '../components/FooterNotice';
import AppButton from '../components/AppButton/AppButton';
export default {
  components: {
    BaseLayout,
    AppWelcome,
    FooterNotice,
    LocationIcon,
    AppButton
  }
};
</script>

<style type="postcss"></style>
