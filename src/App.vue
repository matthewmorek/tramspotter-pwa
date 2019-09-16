<template>
  <div id="app">
    <main v-if="isEmpty(nearestStop)" class="app-content">
      <div class="app-main">
        <AppIcon />
        <h1 class="app-name">Tramspotter</h1>
        <p class="app-description">
          Find your nearest Metrolink tram stop and check it for live
          departures.
        </p>
      </div>
      <footer class="app-footer">
        <div class="app-footer--cta">
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
            Find a tram stop
          </button>
        </div>
        <div class="app-footer--notice">
          <div class="app-footer--notice-icon">
            <LocationIcon class="app-footer-icon" />
          </div>
          <div class="app-footer--notice-text">
            A permission to access your device location is required.
          </div>
        </div>
      </footer>
    </main>
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
import isEmpty from 'lodash/fp/isEmpty';
import AppIcon from './public/app-icon.svg';
import IconRecord from './public/record.svg';
import LocationIcon from './public/location.svg';
import TfgmIcon from './public/tfgm-icon.svg';
import { formatDistance } from 'date-fns';

export default {
  name: 'Tramspotter',
  components: {
    AppIcon,
    IconRecord,
    LocationIcon,
    TfgmIcon
  },
  data() {
    return {
      isLoading: false,
      hasErrors: false,
      error: null,
      now: new Date(),
      updateExists: false,
      worker: null,
      refreshing: false
    };
  },
  computed: {
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
:root {
  --font-family: 'Avenir Next', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  --app-bg: #fff;

  --btn-color-bg: #373737;
  --btn-color-border: rgba(0, 0, 0, 0);
  --btn-color-text: #fff;

  --btn-color-bg--disabled: transparent;
  --btn-color-border--disabled: #e6e6e6;
  --btn-color-text--disabled: #373737;

  --pill-color-bg: #ececec;
  --pill-color-text: #373737;

  --pill-color-bg--special: #ffa800;
  --pill-color-text--special: #373737;

  --text-size: 1rem;
  --text-size-sm: 0.875rem;
  --text-color: #373737;

  --notice-color-bg: #f9f2d0;
  --notice-color-text: #373737;
  --header-color-border: #e2e2e2;
  --color-red: #e74c3c;
  --color-blue: #11a2f8;
  --color-orange: #ffa800;
  --icon-contrast: #373737;

  @media (prefers-color-scheme: dark) {
    --app-bg: #1a1a1a;

    --btn-color-bg: #dedede;
    --btn-color-border: rgba(0, 0, 0, 0);
    --btn-color-text: #1a1a1a;

    --btn-color-bg--disabled: transparent;
    --btn-color-border--disabled: #464646;
    --btn-color-text--disabled: #1a1a1a;

    --pill-color-bg: #111;
    --pill-color-text: #dedede;

    --pill-color-bg--special: #ffa800;
    --pill-color-text--special: #373737;

    --text-color: #dedede;
    --text-color-dimmed: #cacaca;

    --notice-color-bg: #111;
    --notice-color-text: #dedede;

    --header-color-border: #4a4a4a;
    --icon-contrast: #dedede;
  }
}

html,
body {
  font-family: var(--font-family);
  line-height: 1.4;
  font-size: var(--text-size);
  font-weight: 400;
  color: var(--text-color);
  background-color: var(--app-bg);
  height: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
  line-height: 1.5;
}

p {
  margin-top: 0;
  margin-bottom: 1em;

  & + p {
    margin-top: 1em;
  }

  &:only-child {
    margin-top: 0;
    margin-bottom: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

ul,
ol {
  padding-left: 1.5rem;
  margin-top: 1em;
  margin-bottom: 1em;
}

ul {
  list-style-type: square;
}

img {
  max-width: 100%;
  display: block;
}

#app {
  max-width: 30em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 100%;
}

.snackbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--pill-color-bg--special);
  color: var(--pill-color-text--special);
  text-align: center;
  font-size: var(--text-size-sm);
  font-weight: 500;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 -1px 3px;
  cursor: default;
}

.app-content {
  padding: 1.5rem;
  min-height: 100%;
  display: grid;
}

.app-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.app-name {
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  margin-bottom: 1rem;
}

.app-description {
  font-size: 1.125rem;
  text-align: center;
}

.app-footer {
  margin-top: auto;
}

.app-footer--cta {
  margin-bottom: 1.5rem;
}

.app-footer--notice {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;

  &-text {
    font-size: 0.875rem;
    padding-left: 0.75rem;
  }
}

.app-footer-icon {
  fill: var(--icon-contrast);
}

.btn-cta {
  appearance: none;
  background: var(--btn-color-bg);
  border: 1px solid var(--btn-color-border);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4rem;
  color: var(--btn-color-text);
  font-size: 1.125rem;
  font-weight: 500;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-family: var(--font-family);
  width: 100%;
  height: 3.125rem;

  &:active {
    box-shadow: none;
  }

  &:disabled {
    background: var(--btn-color-bg--disabled);
    border-color: var(--btn-color-border--disabled);
    box-shadow: none;
    color: var(--btn-color-text--disabled);
  }
}

.app-header {
  display: flex;
  margin-bottom: 1.5rem;

  &--stop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0.75rem;
  }

  .stop-name {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
  }

  .stop-distance {
    font-size: 0.875rem;
  }
}

.app-departures {
  &--timetable {
    list-style: none;
    margin: 0.5rem 0 1rem;
    padding: 0;
  }

  &--timestamp {
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
  }
}

.timetable-item {
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &--destination {
    font-size: 1rem;
    font-weight: 500;
  }

  &--carriages {
    font-size: 0.875rem;
  }

  &--wait {
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 64px;
    color: var(--pill-color-text);
    background-color: var(--pill-color-bg);
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    margin-left: 0.5rem;

    &.near {
      background-color: var(--pill-color-bg--special);
      color: var(--pill-color-text--special);
    }
  }
}

.app-notice {
  font-size: 0.875rem;
  color: var(--notice-color-text);
  background-color: var(--notice-color-bg);
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  border-bottom: 1px solid var(--header-color-border);
  padding-bottom: 0.25rem;
  color: var(--text-color-dimmed);

  &--label {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    line-height: 2;
  }

  &--live {
    display: flex;
    border: 1px solid var(--text-color);
    border-radius: 3px;
    padding: 0.125rem 0.33rem;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 1px;
    animation: 1s ease-in-out infinite alternate breathe;
    line-height: 1.5;
    text-transform: uppercase;
    align-items: center;

    svg {
      fill: var(--color-red);
      display: inline-block;
      margin-right: 0.125rem;
    }
  }
}

@keyframes breathe {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.3;
  }
}

.spinner {
  display: block;
  width: 1.5rem;
  height: 1.5rem;

  position: relative;
  margin: 0 auto;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--color-orange);
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1s;
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}

.btn-flat {
  .double-bounce1,
  .double-bounce2 {
    background-color: var(--color-blue);
  }
}
</style>
