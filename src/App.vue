<template>
  <div id="app">
    <AppHeader />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
export default {
  name: "app",
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
@import "~reset-css/sass/reset";
@import "~tachyons-sass/tachyons.scss";

html,
body {
  font-family: "Muli", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
