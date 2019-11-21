<template>
  <div id="app">
    <app-welcome
      v-if="isEmpty(nearestStop)"
      :is-loading="isLoading"
      @fetch-stop-info="getNearestStop"
    />

    <main v-else class="app-content">
      <div class="app-main--departures">
        <header class="app-header">
          <div class="app-header--icon">
            <AppIcon class="app-icon" width="52" height="52" />
          </div>
          <div class="app-header--stop">
            <h2 class="stop-name">{{ nearestStop.stationLocation }}</h2>
            <div class="stop-distance">{{ distanceToStop }} mls away</div>
          </div>
        </header>
        <section class="app-departures">
          <header class="section-header">
            <h4 class="section-header--label">Departures</h4>
            <div v-if="isLive" class="section-header--live">
              <IconRecord width="12" height="12" />LIVE
            </div>
          </header>
          <div v-if="!isEmpty(departures)">
            <ul class="app-departures--timetable">
              <li
                v-for="tram in departures"
                :key="tram.id"
                class="timetable-item"
              >
                <div class="timetable-item--destination">
                  {{ tram.destination }}
                </div>
                <div class="timetable-item--info">
                  <span class="timetable-item--carriages">
                    {{ tram.carriages }}
                  </span>
                  <span
                    class="timetable-item--wait"
                    :class="{ near: tram.wait <= 5 || tram.wait === null }"
                    >{{
                      tram.wait > 0 ? `${tram.wait} min` : tram.status
                    }}</span
                  >
                </div>
              </li>
            </ul>
            <p class="app-departures--timestamp">
              Updated {{ lastUpdate }} ago
            </p>
          </div>
          <p v-else>There are currently no more trams available.</p>
          <p v-if="nearestStop.messageBoard" class="app-notice">
            {{ nearestStop.messageBoard }}
          </p>
          <p>
            <button
              v-if="$wait.is('FETCHING')"
              class="btn-cta"
              :disabled="$wait.is('FETCHING')"
            >
              <span class="spinner">
                <span class="double-bounce1"></span>
                <span class="double-bounce2"></span>
              </span>
            </button>
            <button v-else class="btn-cta" @click="getNearestStop">
              <span>Update</span>
            </button>
          </p>
        </section>
      </div>
      <footer class="app-footer">
        <div class="app-footer--notice">
          <div class="app-footer--notice-icon">
            <TfgmIcon width="42" class="app-footer-icon" />
          </div>
          <div class="app-footer--notice-text">
            This app uses TfGM Open Data 2.0 under Open Government License.
          </div>
        </div>
      </footer>
    </main>
    <div v-if="updateExists" class="snackbar" @click="refreshApp">
      New update available. Tap to upgrade.
    </div>
  </div>
</template>

<script>
import AppWelcome from './layout/AppWelcome';

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
    AppIcon,
    IconRecord,
    TfgmIcon
  },
  data() {
    return {
      // isLoading: false,
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
