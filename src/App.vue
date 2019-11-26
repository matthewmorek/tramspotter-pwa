<template>
  <div id="app">
    <app-welcome
      v-if="isEmpty(nearestStop)"
      :is-loading="isLoading"
      @fetch-stop-info="getNearestStop"
      @show-modal="showModal"
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
      @show-modal="showModal"
    />
    <app-update :update-exists="updateExists" @update-app="refreshApp"
      >New update available. Tap to upgrade.</app-update
    >
    <!-- prettier-ignore -->
    <modal :show="isVisible" @close-modal="hideModal">
      <template #header>About</template>
      <template #default>
        <div class="about-box">
          <app-icon width="48" height="48" class="icon" />
          <h2>Tramspotter {{ `v${appVersion}` }}</h2>
          <p>Get live departures at your nearest Metrolink tram stop.</p>
          <p>
            Copyright &copy; {{currentYear}}
            <a
              href="https://twitter.com/matthewmorek"
              class="app-link"
            >Matthew Morek</a>
          </p>
          <div class="section-cta">
            <a href="https://ko-fi.com/matthewmorek" class="btn-cta">Buy me a coffee ☕️</a>
          </div>
        </div>
        <app-notice>
          <template #icon>
            <tfgm-icon width="42" height="42" class="icon" />
          </template>
          <template #text>This app uses TfGM Open Data 2.0 under Open Government License.</template>
        </app-notice>
      </template>
    </modal>
  </div>
</template>

<script>
import AppWelcome from './layout/AppWelcome';
import AppJourney from './layout/AppJourney';
import AppUpdate from './components/AppUpdate';
import Modal from './components/Modal';
import TfgmIcon from './public/tfgm-icon.svg';
import AppNotice from './components/AppNotice';
import { version } from '../package.json';

import isEmpty from 'lodash/fp/isEmpty';
import AppIcon from './public/app-icon.svg';
import { formatDistance, getYear } from 'date-fns';

export default {
  name: 'Tramspotter',
  components: {
    AppWelcome,
    AppJourney,
    AppUpdate,
    AppIcon,
    Modal,
    TfgmIcon,
    AppNotice
  },
  data() {
    return {
      hasErrors: false,
      error: null,
      now: new Date(),
      updateExists: false,
      worker: null,
      refreshing: false,
      isVisible: false,
      appVersion: version,
      currentYear: getYear(new Date())
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
    getYear,
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
    },
    hideModal() {
      this.isVisible = false;
    },
    showModal() {
      this.isVisible = true;
    }
  }
};
</script>

<style lang="postcss">
@import './styles/global';

.about-box {
  padding-top: 1rem;
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  text-align: center;

  h2 {
    font-weight: 700;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
  }

  .section-cta {
    padding-top: 1.5rem;
    padding-bottom: 1rem;

    .btn-cta {
      font-size: 1rem;
    }
  }

  & + .app-notice {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
