<template>
  <div id="app" class="app-content">
    <article>
      <AppIcon />
      <h1>Tramspotter</h1>
      <div v-if="isEmpty(nearestStop)">
        <p>
          Find your nearest Metrolink tram stop and check it for live
          departures.
        </p>
        <p>
          <button @click="getNearestStop">Find a tram stop</button>
        </p>
        <p>A permission to access your device location is required.</p>
      </div>
      <div v-else>
        <h2>{{ nearestStop.stationLocation }}</h2>
        <ul v-if="!isEmpty(nearestStop.arrivals)">
          <li v-for="tram in nearestStop.arrivals" :key="tram.id">
            {{ tram.destination }}: {{ tram.wait }} min ({{ tram.carriages }})
          </li>
        </ul>
        <p v-else>There are currently no more trams available.</p>
        <p>
          <button @click="getNearestStop">Refresh</button>
        </p>
      </div>
      <p>{{ error }}</p>
    </article>
  </div>
</template>

<script>
import isEmpty from 'lodash/fp/isEmpty';
import AppIcon from './public/app-icon.svg';

export default {
  name: 'Tramspotter',
  components: {
    AppIcon
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
    }
  },
  mounted() {
    const coordinates = this.$store.state.coordinates;

    if (!isEmpty(coordinates)) {
      this.getNearestStop();
    }
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
    }
  }
};
</script>

<style lang="scss">
@import '~reset-css/sass/reset';
@import '~tachyons-sass/tachyons.scss';

html,
body {
  font-family: 'Avenir Next', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.4rem;
  font-size: 1.125rem;
  font-weight: 400;
}

p {
  margin-top: 0;
  margin-bottom: 1em;

  & + p {
    margin-top: 1em;
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
  display: grid;
  grid: 1fr 3.25rem 2.625rem / 1fr;
  grid-row-gap: 1.25rem;
  padding: 1.5rem;
  min-height: 100vh;
}
</style>
