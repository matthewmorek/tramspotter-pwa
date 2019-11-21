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
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../BaseLayout';
import LocationIcon from '../../public/location.svg';
import AppInfo from '../../components/AppInfo';
import AppNotice from '../../components/AppNotice';
import AppButton from '../../components/AppButton';
export default {
  components: {
    BaseLayout,
    AppInfo,
    AppNotice,
    LocationIcon,
    AppButton
  },
  props: {
    isLoading: {
      type: Boolean
    }
  }
};
</script>
