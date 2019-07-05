import { version } from '../package.json';
import Vue from 'vue';
import Vuex from 'vuex';
import VueWait from 'vue-wait';
import VueGeolocation from 'vue-browser-geolocation';
import axios from 'axios';
import isEmpty from 'lodash/fp/isEmpty';

Vue.use(Vuex);
Vue.use(VueWait);
Vue.use(VueGeolocation);

const autosave = store => {
  store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
  });
};

export default new Vuex.Store({
  state: {
    coordinates: {},
    compiled: {},
    version: ''
  },
  mutations: {
    init_store(state) {
      if (localStorage.getItem('store')) {
        let store = JSON.parse(localStorage.getItem('store'));

        // Check the version stored against current. If different, don't
        // load the cached version
        if (store.version == version) {
          this.replaceState(Object.assign(state, store));
        } else {
          state.version = version;
        }
      }
    },
    update_coordinates(state, { lat, lng }) {
      state.coordinates = {
        ...state.coordinates,
        latitude: lat,
        longitude: lng
      };
    },
    update_metrolink_data(state, data) {
      state.compiled = Object.assign({}, data);
    }
  },
  actions: {
    getCoordinates({ commit }) {
      return new Promise(resolve => {
        this._vm
          .$getLocation({
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 1800
          })
          .then(coordinates => {
            commit('update_coordinates', coordinates);
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
    getNearestStopData({ commit, state }) {
      const { longitude, latitude } = state.coordinates;
      return axios
        .get('/.netlify/functions/nearest', {
          params: { longitude, latitude }
        })
        .then(({ data }) => {
          commit('update_metrolink_data', data);
        })
        .catch(error => new Error(error));
    }
  },
  getters: {
    getDistanceToStop: state => {
      const { distance } = state.compiled;
      let readableDistance = (distance / 1609.344).toFixed(2);
      return readableDistance;
    },
    getDepartures: state => {
      if (isEmpty(state.compiled)) {
        return null;
      }

      const { arrivals } = state.compiled;
      let departures = arrivals
        .filter(tram => tram.wait !== 0)
        .sort((a, b) => a.wait > b.wait);
      return departures;
    },
    getTimestamp: state => state.compiled.timestamp
  },
  plugins: [autosave]
});
