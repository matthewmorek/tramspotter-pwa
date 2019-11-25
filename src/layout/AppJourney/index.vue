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
      <app-about @show-modal="$emit('show-modal')" />
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../BaseLayout';
import AppButton from '../../components/AppButton';
import StopInfo from '../../components/StopInfo';
import Departures from '../../components/Departures';
import MessageBoard from '../../components/MessageBoard';
import Timestamp from '../../components/Timestamp';
import AppAbout from '../../components/AppAbout';

export default {
  components: {
    BaseLayout,
    AppButton,
    StopInfo,
    Departures,
    MessageBoard,
    Timestamp,
    AppAbout
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
