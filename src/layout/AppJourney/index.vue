<template>
  <base-layout>
    <template #default>
      <stop-info
        :stop-location="stopLocation"
        :distance-to-stop="distanceToStop"
      />
      <departures :departures="departures" :is-live="isLive" />
      <message-board :message="message" />
      <timestamp :last-update="lastUpdate" />
    </template>
    <template #footer>
      <div class="app-footer--cta">
        <app-button
          :is-loading="isLoading"
          @btn-click="$emit('fetch-stop-info')"
          >Refresh</app-button
        >
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
import Departures from '../../components/Departures';
import MessageBoard from '../../components/MessageBoard';
import Timestamp from '../../components/Timestamp';

export default {
  components: {
    BaseLayout,
    TfgmIcon,
    AppNotice,
    AppButton,
    StopInfo,
    Departures,
    MessageBoard,
    Timestamp
  },
  props: {
    isLoading: {
      type: Boolean
    },
    stopLocation: {
      type: String,
      required: true
    },
    distanceToStop: {
      type: Number,
      required: true
    },
    departures: {
      type: Array,
      default: null
    },
    isLive: {
      type: Boolean
    },
    message: {
      type: String,
      default: null
    },
    lastUpdate: {
      type: String,
      default: null
    }
  }
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
