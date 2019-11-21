<template>
  <base-layout>
    <template #header>
      <h1 class="app-title">
        Tramspotter <span class="app-version">v{{ appVersion }}</span>
      </h1>
    </template>
    <template #default>
      <stop-info
        :stop-location="stopLocation"
        :distance-to-stop="distanceToStop"
      />
    </template>
    <template #footer>
      <div class="app-footer--cta">
        <app-button @click="() => false">Update</app-button>
      </div>
      <app-notice>
        <template #icon>
          <tfgm-icon width="42" height="42" class="icon" />
        </template>
        <template #text>
          This app uses TfGM Open Data 2.0 under Open Government License.
        </template>
      </app-notice>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../BaseLayout';
import TfgmIcon from '../../public/tfgm-icon.svg';
import AppNotice from '../../components/AppNotice';
import AppButton from '../../components/AppButton';
import StopInfo from '../../components/StopInfo';

export default {
  components: {
    BaseLayout,
    TfgmIcon,
    AppNotice,
    AppButton,
    StopInfo
  },
  props: ['stopLocation', 'distanceToStop', 'appVersion']
};
</script>

<style lang="postcss">
.app-title {
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 0.75rem;
}

.app-version {
  font-weight: 400;
}
</style>
