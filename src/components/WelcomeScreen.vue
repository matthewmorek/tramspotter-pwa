<template>
  <article class="app-content">
    <h1>Tramspotter</h1>
    <p>
      Find your nearest Metrolink tram stop and check it for live departures.
    </p>
    <div v-if="isEmpty(coordinates)">
      <p>
        <button @click="getNearestStop">
          Find a tram stop
        </button>
      </p>
      <p>
        A permission to access your device location is required.
      </p>
    </div>
    <div v-else>
      <ul>
        <li><span class="b">Lat:</span> {{ coordinates.latitude }}</li>
        <li><span class="b">Lon:</span> {{ coordinates.longitude }}</li>
        <li v-if="atcoCode"><span class="b">ATCODE:</span> {{ atcoCode }}</li>
        <li v-if="stopId"><span class="b">Stop ID:</span> {{ stopId }}</li>
      </ul>
      <p>
        <button @click="getNearestStop">
          Refresh
        </button>
      </p>
    </div>
    <p>{{ error }}</p>
  </article>
</template>

<script>
import isEmpty from 'lodash/fp/isEmpty';

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
    atcoCode: function() {
      const { atcoCode } = this.$store.state.current;
      return atcoCode;
    },
    stopId: function() {
      const { id } = this.$store.state.current;
      return id;
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
            this.$store.dispatch('setCoordinates', { coordinates });
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
      const fetchStopInfo = this.fetchStopInfo;

      getCoordinates()
        .then(fetchStopCode)
        .then(fetchAllStops)
        .then(fetchStopInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-content {
  padding: 1rem;
}
</style>
