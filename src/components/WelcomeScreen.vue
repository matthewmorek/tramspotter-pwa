<template>
  <article class="app-content">
    <p>
      This app will allow you to find out nearest Metrolink tram stop and see
      upcoming departures based on your current location in real time.
    </p>
    <p>
      It requires access to your device location services in order to work
      accurately.
    </p>
    <p>
      <button @click="enableGeolocation">Locate a nearest tram stop</button>
    </p>
  </article>
</template>

<script>
export default {
  name: "WelcomeScreen",

  data() {
    return {};
  },
  methods: {
    enableGeolocation: function() {
      this.$getLocation({
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 86400
      }).then(coordinates => {
        console.log(coordinates);
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
