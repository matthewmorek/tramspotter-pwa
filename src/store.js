import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const autosave = store => {
  store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem("store", JSON.stringify(state));
  });
};

export default new Vuex.Store({
  state: {},
  mutations: {
    INIT_STORE(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    }
  },
  actions: {},
  plugins: [autosave]
});
