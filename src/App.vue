<template>
  <div id="app">
    <AppHeader />
    <WelcomeScreen />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import WelcomeScreen from './components/WelcomeScreen.vue';

export default {
  components: {
    AppHeader,
    WelcomeScreen
  }
};
</script>

<style lang="scss">
@import '~reset-css/sass/reset';
@import '~tachyons-sass/tachyons.scss';

html,
body {
  font-family: 'Muli', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
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
</style>
