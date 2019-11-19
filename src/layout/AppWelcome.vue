<template>
  <base-layout>
    <template #default>
      <app-info />
    </template>
    <template #footer>
      <div class="app-footer--cta">
        <app-button @click="() => false">Find a tram stop</app-button>
      </div>
      <app-notice>
        <template #icon>
          <location-icon class="app-notice--icon" />
        </template>
        <template #text>
          You will be asked to temporarily share your current device location.
        </template>
      </app-notice>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from './BaseLayout';
import LocationIcon from '../public/location.svg';
import AppInfo from '../components/AppInfo';
import AppNotice from '../components/AppNotice';
import AppButton from '../components/AppButton';
export default {
  components: {
    BaseLayout,
    AppInfo,
    AppNotice,
    LocationIcon,
    AppButton
  }
};
</script>
