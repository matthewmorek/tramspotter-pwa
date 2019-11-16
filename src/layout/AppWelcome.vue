<template>
  <base-layout>
    <template #default>
      <app-info />
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
          You will be asked to temporarily share your current device location.
        </template>
      </footer-notice>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from './BaseLayout';
import LocationIcon from '../public/location.svg';
import AppInfo from '../components/AppInfo/AppInfo';
import FooterNotice from '../components/FooterNotice';
import AppButton from '../components/AppButton/AppButton';
export default {
  components: {
    BaseLayout,
    AppInfo,
    FooterNotice,
    LocationIcon,
    AppButton
  }
};
</script>
