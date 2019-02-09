<template>
  <header class="app-header ml-auto mr-auto bg-black">
    <h1 class="app-title gold">Tram-spotter</h1>
  </header>
</template>

<script>
export default {
  name: "AppHeader",

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.app-title {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
}
</style>
