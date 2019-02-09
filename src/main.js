import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

import VueGeolocation from "vue-browser-geolocation";

Vue.use(VueGeolocation);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
