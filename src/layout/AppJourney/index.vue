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
      <div class="app-footer--about">
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
import AppButton from '../../components/AppButton';
import StopInfo from '../../components/StopInfo';
import Departures from '../../components/Departures';
import MessageBoard from '../../components/MessageBoard';
import Timestamp from '../../components/Timestamp';
import InfoIcon from '../../public/info-icon.svg';

export default {
  components: {
    BaseLayout,
    AppButton,
    StopInfo,
    Departures,
    MessageBoard,
    Timestamp,
    InfoIcon
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

.app-footer--about {
  text-align: center;
  padding-top: 1rem;
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color-dimmed);

  .btn-about {
    display: block;
    padding: 0;
    background-color: var(--pill-color-bg);
    border-radius: 64px;

    .icon {
      display: block;
      fill: var(--text-color-dimmed);
    }
  }
}
</style>
