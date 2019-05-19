import Vue from 'vue';
import VueWait from 'vue-wait';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueGeolocation);
Vue.use(VueWait);

Vue.config.productionTip = false;

new Vue({
  store,
  wait: new VueWait({
    useVuex: true
  }),
  beforeCreate() {
    this.$store.commit('init_store');
  },
  render: h => h(App)
}).$mount('#app');
