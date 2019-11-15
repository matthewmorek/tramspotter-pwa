<template>
  <base-layout>
    <template #header>
      <app-welcome />
    </template>
    <template #footer>
      <footer-notice>
        <template #icon>
          <location-icon class="app-footer-icon" />
        </template>
        <template #text
          >A permission to access your device location is required.</template
        >
      </footer-notice>
    </template>
  </base-layout>
</template>

<script>
import LocationIcon from '../../public/location.svg';
import BaseLayout from '../BaseLayout';
import AppWelcome from '../../components/AppWelcome';
import FooterNotice from '../../components/FooterNotice';
export default {
  components: {
    BaseLayout,
    AppWelcome,
    FooterNotice,
    LocationIcon
  }
};
</script>

<style type="postcss"></style>
