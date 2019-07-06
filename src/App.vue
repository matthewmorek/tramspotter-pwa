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
        <div class="mb3">
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
            <LocationIcon />
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
            <h4 class="section-header--label">
              <IconRecord
                v-if="isLive"
                class="app-departures--live"
                width="16"
                height="16"
              />Departures
            </h4>
            <h4 class="section-header--timestamp">
              Updated {{ lastUpdate }} ago
            </h4>
          </header>
          <ul v-if="!isEmpty(departures)" class="app-departures--timetable">
            <li
              v-for="tram in departures"
              :key="tram.id"
              class="timetable-item"
            >
              <div class="timetable-item--destination">
                {{ tram.destination }}
              </div>
              <div class="timetable-item--info">
                <span class="timetable-item--carriages">{{
                  tram.carriages
                }}</span>
                <span
                  class="timetable-item--wait"
                  :class="{ near: tram.wait <= 5 }"
                  >{{ tram.wait }} min</span
                >
              </div>
            </li>
          </ul>
          <p v-else>There are currently no more trams available.</p>
          <p class="app-notice">{{ nearestStop.messageBoard }}</p>
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
              Update
            </button>
          </p>
        </section>
      </div>
      <footer class="app-footer">
        <div class="app-footer--notice">
          <div class="app-footer--notice-icon">
            <img
              src="/img/metrolink.png"
              srcset="/img/metrolink@2x.png 2x, /img/metrolink@3x.png 3x"
              alt="TfGM Metrolink logo"
            />
          </div>
          <div class="app-footer--notice-text">
            This app uses TfGM Open Data 2.0 under Open Government License.
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
import isEmpty from 'lodash/fp/isEmpty';
import AppIcon from './public/app-icon.svg';
import IconRecord from './public/record.svg';
import LocationIcon from './public/location.svg';
import { formatDistanceStrict } from 'date-fns/esm//fp';

export default {
  name: 'Tramspotter',
  components: {
    AppIcon,
    IconRecord,
    LocationIcon
  },
  data() {
    return {
      isLoading: false,
      hasErrors: false,
      error: null,
      now: new Date()
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
      return formatDistanceStrict(this.now, timestamp, {
        addSuffix: true,
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
  methods: {
    isEmpty,
    formatDistanceStrict,
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
    }
  }
};
</script>

<style lang="scss">
@import '~reset-css/sass/reset';
@import '~tachyons-sass/tachyons.scss';

:root {
  --font-family: 'Avenir Next', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --btn-color-bg: #373737;
  --btn-color-border: rgba(0, 0, 0, 0);
  --btn-color-text: #fff;
  --pill-color-bg: #ececec;
  --pill-color-text: #373737;
  --text-size: 1rem;
  --text-color: #373737;
}

html,
body {
  font-family: var(--font-family);
  line-height: 1.4;
  font-size: var(--text-size);
  font-weight: 400;
  color: var(--text-color);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: medium;
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
}

.app-content {
  padding: 1.5rem;
  height: 100%;
}

.app-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-name {
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

.app-description {
  font-size: 1.125rem;
  text-align: center;
}

.app-footer {
  position: sticky;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 1.5rem;
}

.app-footer--notice {
  display: flex;
  align-items: center;

  &-text {
    font-size: 0.875rem;
    padding-left: 0.5rem;
  }
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

  &:active {
    box-shadow: none;
  }

  &:disabled {
    background: transparent;
    border-color: #e6e6e6;
    box-shadow: none;
    color: #222222;
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
      background-color: #ffa800;
      color: #373737;
    }
  }
}

.app-notice {
  font-size: 0.875rem;
  background-color: #f9f2d0;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e2e2;

  &--label {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
  }
}

.app-departures--live {
  display: inline-block;
  line-height: 1;
  margin-right: 0.25rem;
  margin-bottom: 1px;
  fill: #e74c3c;
  animation: 1s ease-in-out infinite alternate breathe;
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
  background-color: #ffa800;
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
    background-color: #11a2f8;
  }
}
</style>
