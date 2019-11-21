<template>
  <div id="app">
    <app-welcome
      v-if="isEmpty(nearestStop)"
      :is-loading="isLoading"
      @fetch-stop-info="getNearestStop"
    />
    <app-journey
      v-else
      :is-live="isLive"
      :is-loading="isLoading"
      :stop-location="nearestStop.stationLocation"
      :distance-to-stop="distanceToStop"
      :message="nearestStop.messageBoard"
      :last-update="lastUpdate"
      :departures="departures"
      @fetch-stop-info="getNearestStop"
    />
    <app-update :update-exists="updateExists" @update-app="refreshApp"
      >New update available. Tap to upgrade.</app-update
    >
  </div>
</template>

<script>
import AppWelcome from './layout/AppWelcome';
import AppJourney from './layout/AppJourney';
import AppUpdate from './components/AppUpdate';

import isEmpty from 'lodash/fp/isEmpty';
import AppIcon from './public/app-icon.svg';
import IconRecord from './public/record.svg';
import LocationIcon from './public/location.svg';
import TfgmIcon from './public/tfgm-icon.svg';
import { formatDistance } from 'date-fns';

export default {
  name: 'Tramspotter',
  components: {
    AppWelcome,
    AppJourney,
    AppUpdate
  },
  data() {
    return {
      hasErrors: false,
      error: null,
      now: new Date(),
      updateExists: false,
      worker: null,
      refreshing: false
    };
  },
  computed: {
    isLoading: function() {
      return this.$wait.is('FETCHING');
    },
    nearestStop: function() {
      const { compiled } = this.$store.state;
      return compiled;
    },
    distanceToStop: function() {
      return this.$store.getters.getDistanceToStop;
    },
    departures: function() {
      return this.$store.getters.getDepartures;
    },
    lastUpdate: function() {
      const timestamp = this.$store.getters.getTimestamp;
      return formatDistance(this.now, timestamp, {
        unit: 'minute',
        roundingMethod: 'floor'
      });
    },
    isLive: function() {
      const timestamp = this.$store.getters.getTimestamp;
      const minutesPast = (this.now - timestamp) / 60;
      return minutesPast < 1;
    }
  },
  mounted() {
    setInterval(() => {
      this.now = new Date();
    }, 1000 * 60);
  },
  created() {
    // Listen for the updateReady event and update the local state accordingly
    document.addEventListener('updateReady', this.showRefreshUI, {
      once: true
    });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker &&
      navigator.serviceWorker.addEventListener(
        // triggered by registration.claim
        'controllerchange',
        () => {
          if (this.refreshing) return;
          this.refreshing = true;
          window.location.reload();
        }
      );
  },
  beforeDestroy() {
    document.removeEventListener('updateReady', this.showRefreshUI);
  },
  methods: {
    isEmpty,
    formatDistance,
    getData: ({ data }) => data,
    getNearestStop: async function() {
      try {
        this.$wait.start('FETCHING');
        await this.$store.dispatch('getCoordinates');
        await this.$store.dispatch('getNearestStopData');
      } catch (error) {
        alert(error);
      } finally {
        this.$wait.end('FETCHING');
      }
    },
    fetchNearestStop: function() {
      const coordinates = this.$store.state.coordinates;

      if (!isEmpty(coordinates)) {
        this.getNearestStop();
      }
    },
    showRefreshUI(event) {
      // Display a button inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      if (event.detail) {
        this.worker = event.detail;
        this.updateExists = true;
      }
    },
    refreshApp() {
      // Handle a user tap on the update app button.
      this.updateExists = false;
      // Protect against missing registration.waiting.
      if (!this.worker) {
        return;
      }
      this.worker.postMessage({ type: 'SKIP_WAITING' });
    }
  }
};
</script>

<style lang="postcss">
@import './styles/global';
</style>
