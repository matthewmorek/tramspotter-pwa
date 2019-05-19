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
          <button class="btn-cta" @click="getNearestStop">
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
          <h4 class="section-heading">Departures</h4>
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
                <span class="timetable-item--carriages">
                  {{ tram.carriages }}
                </span>
                <span
                  class="timetable-item--wait"
                  :class="{ near: tram.wait <= 5 }"
                  >{{ tram.wait }} min</span
                >
              </div>
            </li>
          </ul>
          <p v-else>There are currently no more trams available.</p>
          <p>
            <button class="btn-cta" @click="getNearestStop">Refresh</button>
          </p>
          <p class="app-notice">{{ nearestStop.messageBoard }}</p>
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
import LocationIcon from './public/location.svg';

export default {
  name: 'Tramspotter',
  components: {
    AppIcon,
    LocationIcon
  },
  data() {
    return {
      isLoading: false,
      hasErrors: false,
      error: null
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
    }
  },
  mounted() {
    this.fetchNearestStop();
  },
  methods: {
    isEmpty,
    getData: ({ data }) => data,
    getCoordinates: function() {
      this.error = null;
      return new Promise(resolve => {
        this.$getLocation({
          enableHighAccuracy: true,
          timeout: Infinity,
          maximumAge: 1800
        })
          .then(coordinates => {
            this.$store.dispatch('setCoordinates', {
              coordinates
            });
            // Sample coordinates
            // const coordinates ={
            //   lat: '53.4061151336091',
            //   lng: '-2.3221654377188234'
            // };
            resolve();
          })
          .catch(error => {
            console.error(error);
            switch (error.code) {
              case error.PERMISSION_DENIED:
                this.error = 'User denied the request for Geolocation.';
                break;
              case error.POSITION_UNAVAILABLE:
                this.error = 'Location information is unavailable.';
                break;
              case error.TIMEOUT:
                this.error = 'The request to get user location timed out.';
                break;
              case error.UNKNOWN_ERROR:
                this.error = 'An unknown error occurred.';
                break;
            }
          });
      });
    },
    fetchStopCode: async function() {
      await this.$store.dispatch('setStopCode');
    },
    fetchAllStops: async function() {
      await this.$store.dispatch('setAllStops');
    },
    fetchStopInfo: async function() {
      await this.$store.dispatch('setStopInfo');
    },
    getNearestStop: function() {
      const getCoordinates = this.getCoordinates;
      const fetchStopCode = this.fetchStopCode;
      const fetchAllStops = this.fetchAllStops;

      getCoordinates()
        .then(fetchStopCode)
        .then(fetchAllStops);
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
}

html,
body {
  font-family: var(--font-family);
  line-height: 1.4;
  font-size: 1rem;
  font-weight: 400;
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

.app-content {
  padding: 1.5rem;
  height: 100vh;
}

.app-footer {
  position: sticky;
  top: 100%;
  left: 0;
  right: 0;
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
  background: #11a2f8;
  border: 1px solid #138cd4;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  color: #fff;
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
    background: #e6e6e6;
    border-color: #e6e6e6;
    box-shadow: none;
    color: #222222;
  }
}

.app-main--departures {
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
    margin: 0.5rem 0 1.5rem;
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
    border-radius: 64px;
    color: #fff;
    background-color: #222;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    margin-left: 0.5rem;

    &.near {
      background-color: #ffa800;
      color: #222;
      font-weight: 500;
    }
  }
}

.app-notice {
  font-size: 0.875rem;
  background-color: #f9f2d0;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  margin-top: 1.75rem;
}

.section-heading {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e2e2e2;
}
</style>
