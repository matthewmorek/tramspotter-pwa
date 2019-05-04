<template>
  <article class="app-content">
    <h1>Tramspotter</h1>
    <p>
      Find your nearest Metrolink tram stop and check it for live departures.
    </p>
    <p v-if="isEmpty(coordinates)">
      <button @click="getNearestStop">
        Find a tram stop
      </button>
    </p>
    <ul v-else>
      <li><span class="b">Lat:</span> {{ coordinates.latitude }}</li>
      <li><span class="b">Lon:</span> {{ coordinates.longitude }}</li>
      <li v-if="atcocode"><span class="b">ATCODE:</span> {{ atcocode }}</li>
    </ul>
    <p>
      A permission to access your device location is required.
    </p>
    <p>{{ error }}</p>
  </article>
</template>

<script>
import isEmpty from 'lodash/fp/isEmpty';
import axios from 'axios';

export default {
  name: 'WelcomeScreen',
  data() {
    return {
      isLoading: false,
      hasErrors: false,
      error: null
    };
  },
  computed: {
    coordinates: function() {
      const { coordinates } = this.$store.state;
      return coordinates;
    },
    atcocode: function() {
      const { atcocode } = this.$store.state.current;
      return atcocode;
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
    getNearestStop: function() {
      Promise.resolve()
        .then(() => this.getCoordinates())
        .then(() => this.getStopCode())
        .then(() => this.getStopInfo());
    },
    getCoordinates: function() {
      this.$getLocation({
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 1800
      }).then(
        coordinates => {
          this.$store.commit('update_coordinates', coordinates);
        },
        error => {
          console.log(error);
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
        }
      );
    },
    getStopCode: function() {
      const { latitude, longitude } = this.$store.state.coordinates;
      axios
        .get('https://transportapi.com/v3/uk/places.json', {
          params: {
            app_id: '63ef49e1',
            app_key: 'b657d1ba2817c35cf3c85f412d1d277a',
            lat: latitude,
            lon: longitude,
            type: 'tram_stop'
          }
        })
        .then(response => {
          const { atcocode } = response.data.member[0];
          this.$store.commit('update_current_stop', atcocode);
        });
    },
    getStopInfo: function() {
      // const { atcocode } = this.$store.state.current;
      axios.get('/.netlify/functions/fetch-trams').then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-content {
  padding: 1rem;
}
</style>
