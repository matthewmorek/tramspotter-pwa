<template>
  <base-layout>
    <template #default>
      <app-info />
    </template>
    <template #footer>
      <div class="app-footer--cta">
        <app-button
          :is-loading="isLoading"
          @btn-click="$emit('fetch-stop-info')"
          >Find a tram stop</app-button
        >
      </div>
      <app-notice>
        <template #icon>
          <location-icon width="42" height="42" class="icon" />
        </template>
        <template #text>
          You will be asked to temporarily share your current device location.
        </template>
      </app-notice>
      <div class="app-about">
        <div>Made with ♥️ in MCR.</div>
        <button class="btn-about" @click="$emit('show-modal')">
          <info-icon width="32" height="32" class="icon" />
        </button>
      </div>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../BaseLayout';
import LocationIcon from '../../public/location.svg';
import AppInfo from '../../components/AppInfo';
import AppNotice from '../../components/AppNotice';
import AppButton from '../../components/AppButton';
import InfoIcon from '../../public/info-icon.svg';

export default {
  components: {
    BaseLayout,
    AppInfo,
    AppNotice,
    LocationIcon,
    AppButton,
    InfoIcon
  },
  props: {
    isLoading: {
      type: Boolean
    }
  }
};
</script>
